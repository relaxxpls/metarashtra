import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { gameState, profileState } from '../../recoil/atoms';
import Person from '../Person/Person';

import GameControls from './GameControls';
import GameScore from './GameScoreboard';

// TODO: Make the game dynamic (i.e. based on the room name)
// TODO: Add a "waiting for players" screen
// TODO: Limit the number of players
const Game = ({ socket }) => {
  const [status, setStatus] = useRecoilState(gameState);
  const profile = useRecoilValue(profileState);

  const [users, setUsers] = useState([]);
  const [player, setPlayer] = useState({
    location: { x: 0, y: 0, direction: 'down' },
  });

  useEffect(() => {
    if (!socket?.connected) return;

    socket.emit('join', profile);

    socket.on('updateRoomState', (payload) => {
      setUsers(payload);
    });

    socket.on('userState', (payload) => {
      setPlayer(payload);
    });

    socket.on('disconnect', () => {
      socket.emit('exit', profile);
      setUsers([]);
      setStatus((_status) => ({ ..._status, isDisconnected: true }));
    });
  }, [profile, setStatus, socket]);

  const handlePause = () => {
    setStatus({ ...status, isPaused: true });
    socket?.emit('pause');
  };

  const pixelSize = 3;
  const { x, y } = player.location;

  return (
    <>
      <GameCorners />
      <GameScore handlePause={handlePause} />
      {socket?.connected && <GameControls socket={socket} />}

      <Camera>
        <Map
          style={{
            transform: `translate3d(${(66 - x) * pixelSize}px, ${
              (42 - y) * pixelSize
            }px, 0 )`,
          }}
        >
          {users.map((user) => (
            <Person
              key={user.username}
              isPlayer={user.username === profile.username}
              username={user.username}
              location={user.location}
            />
          ))}
        </Map>
      </Camera>
    </>
  );
};

export default Game;

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
