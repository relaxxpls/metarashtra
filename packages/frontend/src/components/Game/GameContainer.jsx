import { message } from 'antd';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';

import Person from '../Person/Person';

import GameScore from './GameFooter';

const room = 'default';

// TODO: Make the game dynamic (i.e. based on the room name)
// TODO: Add a "waiting for players" screen
// TODO: Limit the number of players
const GameContainer = () => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:8080', {
      forceNew: true,
      transports: ['websocket'],
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join', { room });

    socket.on('updateRoomState', (payload) => {
      setUsers(payload.users);
    });

    socket.on('disconnect', (reason) => {
      message.error(reason);
      setUsers([]);
    });
  }, [socket]);

  return (
    <Frame>
      <GameCorners />
      <GameScore />

      <div className="camera">
        <div className="map">
          {users.map((user) => (
            <Person
              key={user.id}
              isPlayer={user.id === socket?.id}
              socket={socket}
              name={user.name}
              location={user.location}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
};

export default GameContainer;

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

  @media (min-width: 700px) {
    --pixel-size: 3px;
  }

  @media (min-width: 1000px) {
    --pixel-size: 4px;
  }

  .camera {
    width: calc(var(--pixel-size) * 160);
    height: calc(var(--pixel-size) * 144);
    overflow: hidden;
    background: #61ddf7;
    position: relative;
  }

  .map {
    image-rendering: pixelated;
    background: url('images/terrain/CameraDemoMap.webp');
    background-size: 100%;
    width: calc(13 * var(--grid-cell));
    height: calc(10 * var(--grid-cell));
    position: relative;
  }
`;
