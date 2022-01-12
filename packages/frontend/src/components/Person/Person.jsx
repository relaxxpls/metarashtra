import { useEffect } from 'react';
import styled from 'styled-components';

const mapKeyToMove = {
  ArrowUp: { dx: 0, dy: -20, facing: 'up' },
  ArrowDown: { dx: 0, dy: 20, facing: 'down' },
  ArrowLeft: { dx: -20, dy: 0, facing: 'left' },
  ArrowRight: { dx: 20, dy: 0, facing: 'right' },
  w: { dx: 0, dy: -20, facing: 'up' },
  s: { dx: 0, dy: 20, facing: 'down' },
  a: { dx: -20, dy: 0, facing: 'left' },
  d: { dx: 20, dy: 0, facing: 'right' },
};

const Person = ({ isPlayer, socket, name, location }) => {
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
    <Character
      facing={location.facing}
      walking="true"
      style={{ left: `${location.x}px`, top: `${location.y}px` }}
    >
      <span className="name">{name}</span>
      <div className="spritesheet" />
      <div className="shadow" />
    </Character>
  );
};

export default Person;

const backgroundPosition = {
  right: 'calc( var(--pixel-size) * -32 )',
  up: 'calc( var(--pixel-size) * -64 )',
  left: 'calc( var(--pixel-size) * -96 )',
  down: '0px',
};

const Character = styled.div`
  width: calc(var(--grid-cell) * 2);
  height: calc(var(--grid-cell) * 2);
  position: absolute;
  overflow: hidden;

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    padding: 2px 10px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background: #ffffffcc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Monospace;
    font-weight: bold;
    border-radius: 8px;
    z-index: 2;
  }

  .shadow {
    width: calc(var(--grid-cell) * 2);
    height: calc(var(--grid-cell) * 2);
    position: absolute;
    left: 0;
    top: 0;
    background: url('images/sprite/CharacterShadow.webp') no-repeat no-repeat;
    background-size: 100%;
  }

  .spritesheet {
    position: absolute;
    background: url('images/sprite/Character.webp') no-repeat no-repeat;
    background-size: 100%;
    width: calc(var(--grid-cell) * 8);
    height: calc(var(--grid-cell) * 8);
    background-position-y: ${({ facing }) => backgroundPosition[facing]};

    ${({ walking }) =>
      walking &&
      `
    animation: walkAnimation 0.6s steps(4) infinite;
      `}
  }

  @keyframes walkAnimation {
    from {
      transform: translate3d(0%, 0%, 0);
    }
    to {
      transform: translate3d(-100%, 0%, 0);
    }
  }
`;
