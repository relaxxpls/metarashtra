import { nanoid } from 'nanoid';

import { logger } from '../../config';
import { personalRoom } from '../FreeRoam';

export const request =
  (io, socket) =>
  async ({ opponent }) => {
    const { username } = socket.handshake.query;
    logger.info(`${username} is trying to battle with ${opponent}`);

    io.to(personalRoom(opponent)).emit('battle:request', {
      opponent: username,
    });
  };

export const reject =
  (io, socket) =>
  async ({ opponent }) => {
    const { username } = socket.handshake.query;
    logger.info(`${username} rejected ${opponent}'s battle proposal...`);

    io.to(personalRoom(opponent)).emit('battle:reject', {
      opponent: username,
    });
  };

export const accept =
  (io, socket) =>
  async ({ opponent }) => {
    const { username } = socket.handshake.query;
    logger.info(`${username} accepted ${opponent}'s battle proposal!`);
    io.to(personalRoom(opponent)).emit('battle:accept', {
      opponent: username,
    });

    const id = nanoid();
    const battleState = {
      id,
      players: [
        { username, health: 5000 },
        { username: opponent, health: 5000 },
      ],
    };

    io.to(personalRoom(username)).emit('battle:start', battleState);
    io.to(personalRoom(opponent)).emit('battle:start', battleState);
  };

export const move = (io, socket) => async () => {
  const { username } = socket.handshake.query;
  logger.info(`${username} plays ${move}!`);

  io.to(personalRoom(username)).emit('movement', {
    username,
  });
};
