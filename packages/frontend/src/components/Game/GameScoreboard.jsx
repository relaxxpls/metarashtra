import { FaEthereum, FaTrophy } from 'react-icons/fa';
import { HiOutlinePause } from 'react-icons/hi';
import styled from 'styled-components';

import Button from '../shared/Button';

const GameFooter = ({ coins, score, handlePause }) => (
  <Container>
    <Button
      icon={<HiOutlinePause size="30" />}
      type="text"
      onClick={handlePause}
      style={{ border: 'none', padding: '0', width: 'initial' }}
    />

    <div>
      <p>
        <FaEthereum size="18" />
        Coins: {coins || 0}
      </p>

      <p>
        <FaTrophy size="14" />
        Score: {score || 0}
      </p>
    </div>
  </Container>
);

export default GameFooter;

const Container = styled.section`
  position: absolute;
  z-index: 3;
  padding: 0.375rem 0.75rem 0.375rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  background: #f5f5f5ee;
  border-bottom-right-radius: 8px;
  font-weight: bold;
  color: #434343;

  p {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;

    &:not(:first-child) {
      margin: 6px 0 0 0;
    }

    svg {
      margin: 0 6px 0 0;
      width: 18px !important;
      text-align: center;
    }
  }

  .controls {
    text-align: right;
    padding: 0 0 2px 0;

    svg {
      margin: 0 0 0 6px;
    }
  }
`;