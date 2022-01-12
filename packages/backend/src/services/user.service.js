import { getRandomDirection, getRandomPosition } from '../utils';

const users = [];

export const addUser = ({ id, name, room }) => {
  const newUser = {
    id,
    name,
    room,
    position: getRandomPosition(),
    direction: getRandomDirection(),
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

export const updateUser = (id, newUserState) => {
  const userIdx = users.findIndex((user) => user.id === id);
  users[userIdx] = {
    ...users[userIdx],
    ...newUserState,
  };
};

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) =>
  users.filter((user) => user.room === room);
