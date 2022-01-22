import { nanoid } from 'nanoid';

import { logger } from '../../config';
import {
  getBattle,
  removeBattle,
  updateBattle,
} from '../../services/battle.service';
import { personalRoom } from '../FreeRoam';

const MAX_HEALTH = 100;

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

    const battleId = nanoid();
    const battleState = {
      id: battleId,
      players: [
        { username, health: MAX_HEALTH },
        { username: opponent, health: MAX_HEALTH },
      ],
    };
    updateBattle(battleId, battleState);

    io.to(personalRoom(username)).emit('battle:start', battleState);
    io.to(personalRoom(opponent)).emit('battle:start', battleState);
  };

export const update =
  (io, socket) =>
  async ({ battleId, move, opponent }) => {
    const { username } = socket.handshake.query;
    const { title, type, value } = move;

    const battleState = await getBattle(battleId);
    if (battleState === null) {
      logger.error(
        `${username} tried to update a battle that doesn't exist...`
      );
      return;
    }

    logger.info(`[${battleId}] ${username} plays ${title}!`);

    battleState.players = battleState.players.map((player) => {
      if (player.username === username && type === 'heal')
        return {
          ...player,
          health: Math.min(player.health + value, MAX_HEALTH),
        };
      if (player.username === opponent && type === 'attack')
        return {
          ...player,
          health: Math.max(player.health - value, 0),
        };
      return player;
    });

    updateBattle(battleId, battleState);

    io.to(personalRoom(username)).emit('battle:update', battleState);
    io.to(personalRoom(opponent)).emit('battle:update', battleState);
  };

export const end =
  (io, socket) =>
  ({ battleId }) => {
    const { username } = socket.handshake.query;
    logger.info(`[${battleId}] ${username} ended the battle!`);

    removeBattle(battleId);

    io.to(personalRoom(username)).emit('battle:end');
    io.to(personalRoom(username)).emit('battle:end');
  };
