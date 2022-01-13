/* eslint-disable security/detect-object-injection */
import { useEffect, useState } from 'react';

import useInterval from './useInterval';

export const mapKeyToMove = {
  ArrowUp: { dx: 0, dy: -20, facing: 'up' },
  ArrowDown: { dx: 0, dy: 20, facing: 'down' },
  ArrowLeft: { dx: -20, dy: 0, facing: 'left' },
  ArrowRight: { dx: 20, dy: 0, facing: 'right' },
  w: { dx: 0, dy: -20, facing: 'up' },
  s: { dx: 0, dy: 20, facing: 'down' },
  a: { dx: -20, dy: 0, facing: 'left' },
  d: { dx: 20, dy: 0, facing: 'right' },
};

// ? Event Listener for keydown & keyup
const useMoves = () => {
  const [moves, setMoves] = useState([]);
  const [pressed, setPressed] = useState(null);

  const handleKeyDown = ({ key }) => {
    if (mapKeyToMove[key]) {
      setMoves((_moves) => [..._moves, mapKeyToMove[key]]);
    }
  };

  useInterval(
    () => pressed && setMoves((_moves) => [..._moves, mapKeyToMove[pressed]]),
    60
  );

  const handlePressing = (key) => (event) => {
    event.preventDefault();
    setPressed(key);
  };

  const handleNotPressing = () => (event) => {
    event.preventDefault();
    setPressed(null);
  };

  const handleMoveCompleted = () => {
    setMoves((_moves) => _moves.slice(1));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return {
    moves,
    handlePressing,
    handleNotPressing,
    handleMoveCompleted,
  };
};

export default useMoves;
