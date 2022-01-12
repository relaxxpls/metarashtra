import { getRandomCoordinate, getRandomDirection } from '../utils';

const users = [];

export const addUser = ({ id, name, room }) => {
  const newUser = {
    id,
    name,
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
  const currLocation = users[userIdx].location;

  users[userIdx].location = {
    x: currLocation.x + move.dx,
    y: currLocation.y + move.dy,
    facing: move.facing,
  };
};

export const getUser = (id) => users.find((user) => user.id === id);

export const getUsersInRoom = (room) =>
  users.filter((user) => user.room === room);
