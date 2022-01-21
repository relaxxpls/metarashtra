import { FaEthereum, FaTrophy } from 'react-icons/fa';
import { HiOutlinePause } from 'react-icons/hi';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import profileState from '../../recoil/atoms/profile';
import Button from '../shared/Button';

const GameFooter = ({ handlePause }) => {
  const profile = useRecoilValue(profileState);

  return (
    <Container>
      <Button
        icon={<HiOutlinePause size="30" />}
        type="text"
        onClick={handlePause}
        style={{
          border: 'none',
          padding: '0',
          width: 'initial',
        }}
      />

      <div>
        <ScoreContainer>
          <FaEthereum size="24" />
          <span>Coins: {profile.coins}</span>
        </ScoreContainer>

        <ScoreContainer>
          <FaTrophy size="30" />
          <span>Score: {profile.score}</span>
        </ScoreContainer>
      </div>
    </Container>
  );
};

export default GameFooter;

const Container = styled.section`
  position: absolute;
  z-index: 3;
  padding: 0.375rem 0.75rem 0.375rem 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-sizing: border-box;
  background: #f5f5f5ee;
  border-bottom-right-radius: 8px;
  font-weight: bold;
  color: #434343;
`;

const ScoreContainer = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform-origin: left;
  transform: scale(0.75);
  white-space: nowrap;
  margin-right: -3rem;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-family: 'Press Start 2P', monospace;
  }

  svg {
    margin: 0 6px 0 0;
    width: 18px !important;
    text-align: center;
  }
`;
