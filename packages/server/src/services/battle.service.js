import redisClient from '../config/redis';

const getKey = (uuid) => `battle:${uuid}`;

export const getBattle = async ({ battleId }) => {
  const battleState = await redisClient.get(getKey(battleId));

  return battleState ? JSON.parse(battleState) : null;
};

export const updateBattle = ({ battleId, battleState }) =>
  redisClient.set(getKey(battleId), JSON.stringify(battleState));

export const removeBattle = ({ battleId }) => redisClient.del(getKey(battleId));
