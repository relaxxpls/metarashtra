import { message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';

import Person from '../Person/Person';

import GameFooter from './GameFooter';

const room = 'default';

// TODO: Make the game dynamic (i.e. based on the room name)
// TODO: Add a "waiting for players" screen
// TODO: Limit the number of players
const GameContainer = () => {
  const canvasRef = useRef(null);
  const canvasWidth = 460;
  const canvasHeight = 460;

  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const terrainImage = new Image();
      terrainImage.src = '/images/terrain/base.jpg';
      terrainImage.onload = () => ctx.drawImage(terrainImage, 0, 0);
    }
  }, []);

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
    <main>
      <Canvas
        ref={canvasRef}
        width={canvasWidth + 1}
        height={canvasHeight + 1}
      />

      {users.map((user) => (
        <Person
          key={user.id}
          isPlayer={user.id === socket?.id}
          socket={socket}
          name={user.name}
          location={user.location}
        />
      ))}
      <GameFooter />
    </main>
  );
};

export default GameContainer;

const Canvas = styled.canvas`
  background-color: white;
  box-shadow: 0px 2px 4px rgba(227, 233, 237, 0.5);
  border-radius: 8px;
`;
