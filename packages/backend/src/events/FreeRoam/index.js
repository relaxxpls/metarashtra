import { logger } from '../../config';
import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  makeMove,
} from '../../services/user.service';

export const join = (io, socket) => (payload) => {
  const numberOfUsersInRoom = getUsersInRoom(payload.room).length;

  if (numberOfUsersInRoom >= 10) logger.error('Too many participants');

  const newUser = addUser({
    id: socket.id,
    username: payload.username,
    room: payload.room,
    nftId: payload.nftId,
    coins: payload.coins,
    score: payload.score,
  });

  socket.join(newUser.room);

  io.to(newUser.room).emit('updateRoomState', {
    room: newUser.room,
    users: getUsersInRoom(newUser.room),
  });

  socket.emit('currentUserState', newUser);

  logger.info(`[Socket ${socket.id}] ${newUser.username} joined`);
};

export const move = (io, socket) => (payload) => {
  const user = getUser(socket.id);

  if (user && payload) {
    logger.info(`[Socket ${socket.id}] ${user?.username} made a move`);
    makeMove(user.id, payload);

    io.to(user.room).emit('updateRoomState', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  } else {
    logger.error(
      `[Socket ${socket.id}] ${user?.username} made an invalid move`
    );
  }
};

export const disconnect = (io, socket) => () => {
  const user = removeUser(socket.id);

  if (user) {
    io.to(user.room).emit('updateRoomState', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    logger.info(`[Socket ${socket.id}] ${user.username} left`);
  }

  logger.info(`[Socket ${socket.id}] Disconnected`);
};
