import {
  FaArrowUp,
  FaArrowRight,
  FaArrowDown,
  FaArrowLeft,
  FaStar,
  FaTrophy,
} from 'react-icons/fa';
import styled from 'styled-components';

import Button from '../shared/Button';

const GameFooter = ({ score, highscore, isLost, countDown, startGame }) => (
  <Container>
    <div className="score">
      <p>
        <FaStar size="20" />
        Score: {score}
      </p>
      <p>
        <FaTrophy size="20" />
        Highscore: {highscore > score ? highscore : score}
      </p>
    </div>

    {!isLost && countDown > 0 ? (
      <Button type="primary" onClick={startGame}>
        {countDown === 4 ? 'Start Game' : countDown}
      </Button>
    ) : (
      <div className="controls">
        <p>How to Play?</p>
        <p>
          <FaArrowUp size="20" />
          <FaArrowRight size="20" />
          <FaArrowDown size="20" />
          <FaArrowLeft size="20" />
        </p>
      </div>
    )}
  </Container>
);

export default GameFooter;

const Container = styled.section`
  padding: 0 18px 2px 18px;
  height: 66px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  p {
    padding: 0;
    margin: 0;

    &:not(:first-child) {
      margin: 6px 0 0 0;
    }

    svg {
      margin: 0 6px 0 0;
      width: 18px !important;
      text-align: center;
    }
  }

  .score {
    padding: 0 0 2px 0;
  }

  .controls {
    text-align: right;
    padding: 0 0 2px 0;

    svg {
      margin: 0 0 0 6px;
    }
  }
`;
