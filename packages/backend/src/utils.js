export const getRandomPosition = () => ({
  x: Math.floor(Math.random() * 600 + 1),
  y: Math.floor(Math.random() * 600 + 1),
});

export const getRandomDirection = () => {
  const directions = ['left', 'down', 'up', 'right'];

  return directions[Math.floor(Math.random() * directions.length)];
};
