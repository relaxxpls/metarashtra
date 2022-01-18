import { logger } from '../../config';
import {
  removeUser,
  getUser,
  getUsersInRoom,
  roomIsFull,
  updateUser,
} from '../../services/user.service';
// import { getRandomCoordinate, getRandomDirection } from '../../utils';

export const join =
  (io, socket) =>
  async ({ username, room, coins, score }) => {
    logger.info(`${username} is trying to joining.`);
    if (await roomIsFull({ room })) {
      logger.error('Too many participants');
      return;
    }

    const userState = {
      username,
      score,
      coins,
      location: {
        x: 0,
        y: 0,
        facing: 'down',
      },
    };
    await updateUser({ username, room, userState });

    socket.emit('userState', userState);

    socket.join(room);

    const users = await getUsersInRoom(room);
    io.to(room).emit('updateRoomState', users);

    logger.info(`[Socket ${socket.id}] ${username} joined`);
  };

export const movement =
  (io, socket) =>
  async ({ username, room, move }) => {
    const userState = await getUser(username);

    if (!userState) {
      logger.error(`[Socket ${socket.id}] ${username} does not exist.`);
      return;
    }

    userState.location.x += move.dx;
    userState.location.y += move.dy;
    userState.location.facing = move.facing;

    await updateUser({ username, room, userState });

    const users = await getUsersInRoom(room);
    io.to(room).emit('updateRoomState', users);

    logger.info(`[Socket ${socket.id}] ${username} made a move`);
  };

export const disconnect = (io, socket) => async () => {
  const user = removeUser(socket.id);

  if (!user) {
    logger.error(`[Socket ${socket.id}] User does not exist.`);
    return;
  }

  const users = await getUsersInRoom(user.room);
  io.to(user.room).emit('updateRoomState', users);

  logger.info(`[Socket ${socket.id}] ${user.username} left`);
};
