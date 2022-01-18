import redisClient from '../config/redis';
import { User } from '../models';

export const createUser = async (userBody) => {
  if (User.isUsernameTaken(userBody.email)) {
    throw new Error('Username already taken');
  }

  return User.create(userBody);
};

const getKey = (room) => `room:${room}`;

export const updateUser = ({ username, room, userState }) =>
  redisClient.hSet(getKey(room), username, JSON.stringify(userState));

export const removeUser = ({ username, room }) =>
  redisClient.hDel(getKey(room), `${username}`);

export const getUser = async ({ username, room }) => {
  const user = await redisClient.hGet(getKey(room), username);

  return user ? JSON.parse(user) : null;
};

export const getUsersInRoom = async ({ room }) => {
  let usersInRoom = await redisClient.hGetAll(getKey(room));
  usersInRoom = Object.values(usersInRoom).map((value) => JSON.parse(value));

  return usersInRoom;
};

export const roomIsFull = async ({ room }) => {
  const userCount = await redisClient.hLen(getKey(room));
  const maxCapacity = 10;

  return userCount >= maxCapacity;
};
