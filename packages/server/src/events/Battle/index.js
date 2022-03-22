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
  async ({ battleId, opponent, move }) => {
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
      let { health } = player;
      if (player.username === username && type === 'heal')
        health = Math.min(player.health + value, MAX_HEALTH);
      else if (player.username === opponent && type === 'attack')
        health = Math.max(player.health - value, 0);

      return { ...player, health };
    });

    const loser = battleState.players.find((player) => player.health === 0);
    if (loser) {
      logger.info(`[${battleId}] ${loser.username} lost!`);
      removeBattle(battleId);

      const battleEnd = {
        winner: username,
        loser: loser.username,
      };
      io.to(personalRoom(username)).emit('battle:end', battleEnd);
      io.to(personalRoom(opponent)).emit('battle:end', battleEnd);
    } else {
      updateBattle(battleId, battleState);

      io.to(personalRoom(username)).emit('battle:update', battleState);
      io.to(personalRoom(opponent)).emit('battle:update', battleState);
    }
  };

export const forfiet =
  (io, socket) =>
  ({ battleId, opponent }) => {
    const { username } = socket.handshake.query;
    logger.info(`[${battleId}] ${username} forfeits, ${opponent} wins!`);

    removeBattle(battleId);

    const battleEnd = {
      winner: opponent,
      loser: username,
    };
    io.to(personalRoom(username)).emit('battle:end', battleEnd);
    io.to(personalRoom(opponent)).emit('battle:end', battleEnd);
  };
