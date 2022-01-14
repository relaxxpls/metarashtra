/* eslint-disable security/detect-object-injection */
import { getRandomCoordinate, getRandomDirection } from '../utils';

const users = [];

export const addUser = ({ id, username, room }) => {
  const newUser = {
    id,
    username,
    room,
    location: {
      x: getRandomCoordinate(),
      y: getRandomCoordinate(),
      facing: getRandomDirection(),
    },
  };
  users.push(newUser);

  return newUser;
};

export const removeUser = (id) => {
  const removeIndex = users.findIndex((user) => user.id === id);

  if (removeIndex !== -1) {
    return users.splice(removeIndex, 1)[0];
  }

  return null;
};

export const makeMove = (id, move) => {
  const userIdx = users.findIndex((user) => user.id === id);
  const { x = 0, y = 0 } = users[userIdx].location;
  const { dx = 0, dy = 0, facing = 'down' } = move;
  users[userIdx].location = { x: x + dx, y: y + dy, facing };
};

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) =>
  users.filter((user) => user.room === room);
