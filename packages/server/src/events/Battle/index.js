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
  };
