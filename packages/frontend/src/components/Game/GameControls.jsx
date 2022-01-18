import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import useMoves from '../../hooks/useMoves';
import { profileState } from '../../recoil/atoms';

const GameControls = ({ socket }) => {
  const { moves, handleMoveCompleted, handlePressing, handleNotPressing } =
    useMoves();

  const { username } = useRecoilValue(profileState);

  useEffect(() => {
    if (socket && moves.length) {
      socket.emit('move', { ...moves.shift(), username });
    }
  }, [socket, moves, handleMoveCompleted, username]);

  return (
    <Dpad>
      <Button
        type="button"
        className="up"
        onMouseDown={handlePressing('ArrowUp')}
        onMouseUp={handleNotPressing()}
        onTouchStart={handlePressing('ArrowUp')}
        onTouchEnd={handleNotPressing()}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/images/dpad/up.svg"
            layout="fill"
            alt="Dpad Up Button"
            draggable="false"
          />
        </div>
      </Button>

      <Button
        type="button"
        className="down"
        onMouseDown={handlePressing('ArrowDown')}
        onMouseUp={handleNotPressing()}
        onTouchStart={handlePressing('ArrowDown')}
        onTouchEnd={handleNotPressing()}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/images/dpad/down.svg"
            layout="fill"
            alt="Dpad Down Button"
            draggable="false"
          />
        </div>
      </Button>

      <Button
        type="button"
        className="left"
        onMouseDown={handlePressing('ArrowLeft')}
        onMouseUp={handleNotPressing()}
        onTouchStart={handlePressing('ArrowLeft')}
        onTouchEnd={handleNotPressing()}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/images/dpad/left.svg"
            layout="fill"
            alt="Dpad Left Button"
            draggable="false"
          />
        </div>
      </Button>

      <Button
        type="button"
        className="right"
        onMouseDown={handlePressing('ArrowRight')}
        onMouseUp={handleNotPressing()}
        onTouchStart={handlePressing('ArrowRight')}
        onTouchEnd={handleNotPressing()}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/images/dpad/right.svg"
            layout="fill"
            alt="Dpad Right Button"
            draggable="false"
          />
        </div>
      </Button>
    </Dpad>
  );
};

export default GameControls;

const Dpad = styled.div`
  position: absolute;
  right: calc(var(--pixel-size) * 2);
  bottom: calc(var(--pixel-size) * 2);
  width: calc(var(--pixel-size) * 37);
  height: calc(var(--pixel-size) * 38);
  z-index: 2;
`;

const Button = styled.button`
  appearance: none;
  position: absolute;
  height: calc(var(--pixel-size) * 13);
  width: calc(var(--pixel-size) * 13);
  padding: 0;
  outline: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &.up {
    left: calc(var(--pixel-size) * 12);
    top: 0;
  }

  &.down {
    bottom: var(--pixel-size);
    left: calc(var(--pixel-size) * 12);
  }

  &.left {
    top: calc(var(--pixel-size) * 12);
    left: 0;
  }

  &.right {
    top: calc(var(--pixel-size) * 12);
    right: 0;
  }

  &:active {
    img {
      transform: scale(0.9);
      transition: transform 0.1s ease-in-out;
    }
  }
`;
