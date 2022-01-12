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

const attachSockets = (httpServer) => {
  const io = new Server(httpServer);

  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    logger.info('New user connected', { socket: socket.id });

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
    });

    socket.on('move', (move) => {
      const user = getUser(socket.id);

      if (user) {
        logger.info('User has made a move');
        makeMove(user.id, move);

        io.to(user.room).emit('updateRoomState', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('updateRoomState', {
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
