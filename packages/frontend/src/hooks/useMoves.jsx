/* eslint-disable security/detect-object-injection */
import { useEffect, useState } from 'react';

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

  const handleKeyDown = (event) => {
    setMoves((_moves) => [..._moves, mapKeyToMove[event.key]]);
  };

  const handleKeyUp = () => {
    // setMoves((moves) => moves.shift());
  };

  const handlePressing = (key) => (event) => {
    event.preventDefault();
    setMoves([mapKeyToMove[key]]);
  };

  const handleNotPressing = () => (event) => {
    event.preventDefault();
    setMoves([]);
  };

  const handleMoveCompleted = () => {
    setMoves((_moves) => _moves.slice(1));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return { moves, handlePressing, handleNotPressing, handleMoveCompleted };
};

export default useMoves;
