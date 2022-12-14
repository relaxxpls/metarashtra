import { logger } from '../../config';
import {
  getUser,
  getUsersInRoom,
  removeUser,
  roomIsFull,
  updateUser,
} from '../../services/user.service';

export const personalRoom = (username) => `user:${username}`;

export const join =
  (io, socket) =>
  async ({ coins, score }) => {
    const { username, room } = socket.handshake.query;

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
    socket.join(personalRoom(username));

    const users = await getUsersInRoom({ room });
    io.to(room).emit('updateRoomState', users);

    logger.info(`[Socket ${socket.id}] ${username} joined`);
  };

// ? Limits (gives the illusion of walls)
const LIMITS = {
  left: -8,
  right: 16 * 11 + 8,
  top: -8 + 32,
  bottom: 16 * 7,
};

export const movement =
  (io, socket) =>
  async ({ move }) => {
    const { username, room } = socket.handshake.query;

    const userState = await getUser({ username, room });

    if (!userState) {
      logger.error(`[Socket ${socket.id}] ${username} does not exist.`);
      return;
    }

    let { x, y } = userState.location;
    x += move.dx;
    if (x < LIMITS.left) x = LIMITS.left;
    else if (x > LIMITS.right) x = LIMITS.right;

    y += move.dy;
    if (y < LIMITS.top) y = LIMITS.top;
    else if (y > LIMITS.bottom) y = LIMITS.bottom;

    userState.location = { x, y, facing: move.facing };
    await updateUser({ username, room, userState });

    socket.emit('userState', userState);

    const users = await getUsersInRoom({ room });
    io.to(room).emit('updateRoomState', users);
  };

export const exit = (io, socket) => async () => {
  const { username, room } = socket.handshake.query;

  const user = removeUser({ username, room });
  if (!user) {
    logger.error(`[Socket ${socket.id}] User does not exist.`);
    return;
  }

  socket.leave(room);
  socket.leave(personalRoom(username));
  const users = await getUsersInRoom({ room });
  io.to(room).emit('updateRoomState', users);

  logger.info(`[Socket ${socket.id}] ${username} left`);
};
