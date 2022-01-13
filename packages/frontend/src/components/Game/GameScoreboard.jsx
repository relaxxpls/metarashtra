import { FaEthereum, FaTrophy } from 'react-icons/fa';
import styled from 'styled-components';

const GameFooter = ({ score }) => (
  <Container>
    <div className="score">
      <p>
        <FaEthereum size="18" />
        Coins: {score || 0}
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
  padding: 0.25rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    /* justify-content: center; */
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
