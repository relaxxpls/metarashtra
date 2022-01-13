import { message, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';

import Person from '../Person/Person';
import Button from '../shared/Button';
import { PageCard } from '../shared/Page';

import GameControls from './GameControls';
import GameScore from './GameScoreboard';

const room = 'default';

// TODO: Make the game dynamic (i.e. based on the room name)
// TODO: Add a "waiting for players" screen
// TODO: Limit the number of players
const GameContainer = () => {
  const router = useRouter();
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({
    isDisconnected: false,
    isPaused: false,
    loading: true,
  });

  const handleJoin = () => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      forceNew: true,
      transports: ['websocket'],
    });
    setSocket(newSocket);
  };

  // ? Join room on mount
  useEffect(() => {
    handleJoin();
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setStatus((_status) => ({ ..._status, loading: false }));
    });

    socket.emit('join', { room });

    socket.on('updateRoomState', (payload) => {
      setUsers(payload.users);
    });

    socket.on('disconnect', (reason) => {
      message.error(reason);
      setUsers([]);
      setSocket(null);
      setStatus((_status) => ({ ..._status, isDisconnected: true }));
    });
  }, [socket]);

  const handleRejoin = () => {
    if (socket) socket.close();
    handleJoin();
    setStatus((_status) => ({ ..._status, isDisconnected: false }));
  };

  const handleContinue = () => {
    setStatus({ ...status, isPaused: false });
    socket?.emit('continue');
  };

  const handlePause = () => {
    setStatus({ ...status, isPaused: true });
    socket?.emit('pause');
  };

  const handleExit = () => {
    socket?.emit('exit');
    router.push('/');
  };

  const paused = status.isPaused || status.isDisconnected || status.loading;

  return (
    <>
      <Frame paused={paused}>
        <GameCorners />
        <GameScore handlePause={handlePause} />
        <GameControls socket={socket} />

        <Camera>
          <Map>
            {users.map((user) => (
              <Person
                key={user.id}
                isPlayer={user.id === socket?.id}
                name={user.name}
                location={user.location}
              />
            ))}
          </Map>
        </Camera>
      </Frame>

      {paused && (
        <PageCard style={{ position: 'absolute' }}>
          {status.loading ? (
            <Spin style={{ display: 'flex' }} />
          ) : (
            <>
              {status.isDisconnected ? (
                <Button type="primary" onClick={handleRejoin}>
                  Rejoin
                </Button>
              ) : (
                <Button type="primary" onClick={handleContinue}>
                  Continue
                </Button>
              )}

              <Button>Settings</Button>

              <Button type="primary" danger onClick={handleExit}>
                Exit
              </Button>
            </>
          )}
        </PageCard>
      )}
    </>
  );
};

export default GameContainer;
//  map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${
//    -y * pixelSize + camera_top
//  }px, 0 )`;

const GameCorners = () => (
  <Corner>
    <div className="corner_topleft" />
    <div className="corner_topright" />
    <div className="corner_bottomleft" />
    <div className="corner_bottomright" />
  </Corner>
);

const Corner = styled.div`
  .corner_topleft,
  .corner_topright,
  .corner_bottomleft,
  .corner_bottomright {
    position: absolute;
    width: var(--pixel-size);
    height: var(--pixel-size);
    background: var(--bg);
    z-index: 2;
  }

  .corner_topleft {
    top: calc(var(--pixel-size) * -1);
    left: calc(var(--pixel-size) * -1);
  }
  .corner_topright {
    top: calc(var(--pixel-size) * -1);
    right: calc(var(--pixel-size) * -1);
  }
  .corner_bottomleft {
    bottom: calc(var(--pixel-size) * -1);
    left: calc(var(--pixel-size) * -1);
  }
  .corner_bottomright {
    bottom: calc(var(--pixel-size) * -1);
    right: calc(var(--pixel-size) * -1);
  }
`;

const Frame = styled.div`
  --pixel-size: 2px;
  --grid-cell: calc(var(--pixel-size) * 16);
  --bg: #9fa7e4;

  width: calc(var(--pixel-size) * 160);
  height: calc(var(--pixel-size) * 144);
  outline: var(--pixel-size) solid #fff;
  z-index: 1;
  position: relative;
  user-select: none;

  ${({ paused }) =>
    paused &&
    `
  filter: blur(8px);
  pointer-events: none;
    `};

  @media (min-width: 700px) {
    --pixel-size: 3px;
  }

  @media (min-width: 1000px) {
    --pixel-size: 4px;
  }
`;

const Camera = styled.div`
  width: calc(var(--pixel-size) * 160);
  height: calc(var(--pixel-size) * 144);
  overflow: hidden;
  background: #61ddf7;
  position: relative;
`;

const Map = styled.div`
  image-rendering: pixelated;
  background: url('images/terrain/CameraDemoMap.webp');
  background-size: 100%;
  width: calc(13 * var(--grid-cell));
  height: calc(10 * var(--grid-cell));
  position: relative;
`;
