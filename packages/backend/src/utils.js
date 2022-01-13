export const getRandomCoordinate = () => Math.floor(Math.random() * 200 + 1);

export const getRandomDirection = () => {
  const directions = ['left', 'down', 'up', 'right'];

  return directions[Math.floor(Math.random() * directions.length)];
};
