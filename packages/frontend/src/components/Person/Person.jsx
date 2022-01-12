import { useEffect } from 'react';
import styled from 'styled-components';

const mapKeyToMove = {
  ArrowUp: { dx: 0, dy: -20, direction: 'up' },
  ArrowDown: { dx: 0, dy: 20, direction: 'down' },
  ArrowLeft: { dx: -20, dy: 0, direction: 'left' },
  ArrowRight: { dx: 20, dy: 0, direction: 'right' },
  w: { dx: 0, dy: -20, direction: 'up' },
  s: { dx: 0, dy: 20, direction: 'down' },
  a: { dx: -20, dy: 0, direction: 'left' },
  d: { dx: 20, dy: 0, direction: 'right' },
};

const Person = ({ isPlayer, socket, name, location }) => {
  // const [position, setPosition] = useState(initialPosition);
  // const [direction, setDirection] = useState(initialDirection);

  // ? Event Listener: Key Presses
  useEffect(() => {
    if (!isPlayer) return () => {};

    const handleKeyDown = (event) => {
      const move = mapKeyToMove[event.key];
      if (!move) return;

      socket.emit('move', move);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [socket, isPlayer]);

  return (
    <StyledPerson
      direction={location.direction}
      style={{ left: `${location.x}px`, top: `${location.y}px` }}
    />
  );
};

export default Person;

const getBackgroundPosition = (direction) => {
  switch (direction) {
    case 'left':
      return '0px 0px';
    case 'up':
      return '64px 0px';
    case 'right':
      return '128px 0px';
    case 'down':
      return '192px 0px';
    default:
      return '0px 0px';
  }
};

const StyledPerson = styled.div`
  /* position: relative; */
  position: absolute;
  background-image: url(/images/sprite/svJacob-2.svg);
  width: 64px;
  height: 64px;
  margin: 64px auto;
  background-size: 400%;
  background-position: ${({ direction }) => getBackgroundPosition(direction)};
  animation: move 0.5s steps(4, end) infinite;

  @keyframes move {
    to {
      background-position-y: calc(16px * 16);
    }
  }
`;
