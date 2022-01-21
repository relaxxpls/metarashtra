import { Progress } from 'antd';
import { darken, lighten } from 'polished';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const updateFreq = 50;

const BattleMove = ({ title, timeout, color, socket }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((p) => {
        if (p === 100) return p;
        const dp = (100 * updateFreq) / timeout;
        return Math.min(p + dp, 100);
      });
    }, updateFreq);

    return () => clearInterval(intervalId);
  }, [timeout]);

  const handleMove = () => {
    setProgress(0);
    socket.emit('battle:move', title);
  };

  return (
    <StyledButton
      type="primary"
      onClick={handleMove}
      color={color}
      disabled={progress !== 100}
    >
      {title}

      {progress < 100 && (
        <Progress
          size="small"
          percent={progress}
          strokeColor={{
            '0%': color,
            '100%': darken(0.1, color),
          }}
          // strokeColor={darken(0.1, color)}
          showInfo={false}
          style={{
            position: 'absolute',
            bottom: '-0.5rem',
            padding: '0.5rem',
          }}
          trailColor="#f5f5f588"
        />
      )}
    </StyledButton>
  );
};

export default BattleMove;

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color};
  text-align: center;
  padding: 0.5rem 1rem;
  box-shadow: inset -4px -4px 0px 0px ${({ color }) => darken(0.1, color)};
  font-family: 'Press Start 2P', monospace;
  transform: scale(0.75, 1);
  letter-spacing: 2px;
  text-decoration: none;
  color: white;
  height: 3rem;
  width: 100%;

  &:hover,
  &:focus {
    background: ${({ color }) => lighten(0.05, color)};
    box-shadow: inset -3px -3px 0px 0px ${({ color }) => darken(0.1, color)};
  }

  &:active {
    box-shadow: inset 4px 4px 0px 0px ${({ color }) => darken(0.1, color)};
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
  }

  &:before {
    top: -3px;
    left: 0;
    border-top: 3px black solid;
    border-bottom: 3px black solid;
  }

  &:after {
    left: -3px;
    top: 0;
    border-left: 3px black solid;
    border-right: 3px black solid;
  }

  &:disabled {
    background: ${({ color }) => lighten(0.05, color)};
    box-shadow: inset -4px -4px 0px 0px ${({ color }) => darken(0.1, color)};
    pointer-events: none;
    cursor: not-allowed;
  }
`;
