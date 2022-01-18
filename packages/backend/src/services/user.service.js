import redisClient from '../config/redis';
import { User } from '../models';
// import { getRandomCoordinate, getRandomDirection } from '../utils';

export const createUser = async (userBody) => {
  if (User.isUsernameTaken(userBody.email)) {
    throw new Error('Username already taken');
  }

  return User.create(userBody);
};

const getKey = (room) => `room:${room}`;

export const addUser = async ({ username, room }) => {
  const newUser = {
    x: 0,
    y: 0,
    facing: 'down',
  };
  await redisClient.hSet(getKey(room), username, JSON.stringify(newUser));

  return newUser;
};

export const removeUser = async ({ username, room }) => {
  await redisClient.hDel(getKey(room), `${username}`);
};

export const makeMove = async ({ username, room, move }) => {
  // const users = [];
  // const userIdx = users.findIndex((user) => user.id === id);
  // const { x = 0, y = 0 } = users[userIdx].location;
  // const { dx = 0, dy = 0, facing = 'down' } = move;
  // users[userIdx].location = { x: x + dx, y: y + dy, facing };
};

export const getUser = async ({ username, room }) => {
  const user = await redisClient.hGet(getKey(room), username);

  return user ? JSON.parse(user) : null;
};

export const getUsersInRoom = async ({ room }) => {
  let usersInRoom = await redisClient.hGetAll(getKey(room));
  usersInRoom = Object.values(usersInRoom).map((value) => JSON.parse(value));

  return usersInRoom;
};
