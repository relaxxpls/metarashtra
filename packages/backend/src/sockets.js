import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';

import { logger } from './config';
import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  makeMove,
} from './services/user.service';

const attachSockets = async (httpServer) => {
  const io = new Server(httpServer);

  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    socket.on('join', (payload) => {
      const numberOfUsersInRoom = getUsersInRoom(payload.room).length;
      if (numberOfUsersInRoom >= 10) logger.error('Too many participants');

      const newUser = addUser({
        id: socket.id,
        name: `Player ${numberOfUsersInRoom + 1}`,
        room: payload.room,
      });

      socket.join(newUser.room);

      io.to(newUser.room).emit('updateRoomState', {
        room: newUser.room,
        users: getUsersInRoom(newUser.room),
      });

      socket.emit('currentUserState', newUser);

      logger.info(`[Socket ${socket.id}] ${newUser.name} joined`);
    });

    socket.on('move', (move) => {
      const user = getUser(socket.id);

      if (user && move) {
        logger.info(`[Socket ${socket.id}] ${user?.name} made a move`);
        makeMove(user.id, move);

        io.to(user.room).emit('updateRoomState', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      } else {
        logger.error(
          `[Socket ${socket.id}] ${user?.name} made an invalid move`
        );
      }
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateRoomState', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });

        logger.info(`[Socket ${socket.id}] ${user.name} left`);
      }

      logger.info(`[Socket ${socket.id}] Disconnected`);
    });
  });
};

export default attachSockets;
