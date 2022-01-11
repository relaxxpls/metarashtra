import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';

import { logger } from './config';
import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} from './services/user.service';

const attachSockets = async (httpServer) => {
  const io = new Server(httpServer);

  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    logger.info('New user connected', { socket: socket.id });

    socket.on('join', (payload, callback) => {
      const numberOfUsersInRoom = getUsersInRoom(payload.room).length;

      const { error, newUser } = addUser({
        id: socket.id,
        name: `Player ${numberOfUsersInRoom + 1}`,
        room: payload.room,
      });

      if (error) return callback(error);

      socket.join(newUser.room);

      io.to(newUser.room).emit('roomData', {
        room: newUser.room,
        users: getUsersInRoom(newUser.room),
      });
      socket.emit('currentUserData', { name: newUser.name });

      return callback();
    });

    socket.on('initGameState', (gameState) => {
      const user = getUser(socket.id);

      if (user) {
        io.to(user.room).emit('initGameState', gameState);
      }
    });

    socket.on('updateGameState', (gameState) => {
      const user = getUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateGameState', gameState);
      }
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
        logger.info('User disconnected', { socket: socket.id });
      }

      logger.info('User not in room', { socket: socket.id });
    });
  });
};

export default attachSockets;
