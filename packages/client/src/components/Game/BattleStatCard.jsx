import { Progress } from 'antd';
import { useCallback } from 'react';
import styled from 'styled-components';

const BattleStatCards = ({ player, opponent }) => {
  const getColor = (_percent) => {
    if (_percent > 80) return '#00C19A';
    if (_percent > 20) return '#008DF0';
    return '#E97461';
  };

  const getFormattedPercent = useCallback(
    (_percent) => (
      <HP>
        HP <br />
        {Math.floor(_percent * 50)}
      </HP>
    ),
    []
  );

  const playerPercent = Math.floor(Math.random() * 100);
  const opponentPercent = Math.floor(Math.random() * 100);

  return (
    <BattleInfoContainer>
      <BattleInfo>
        <PlayerInfo>
          <span>{player}</span>
          <span>lvl 0</span>
        </PlayerInfo>

        <Progress
          type="circle"
          percent={playerPercent}
          format={getFormattedPercent}
          strokeColor={getColor(playerPercent)}
          trailColor="transparent"
          width="100px"
        />
      </BattleInfo>

      <BattleInfo>
        <PlayerInfo>
          <span>{opponent ?? 'null'}</span>
          <span>lvl 0</span>
        </PlayerInfo>

        <Progress
          type="circle"
          percent={opponentPercent}
          format={getFormattedPercent}
          strokeColor={getColor(opponentPercent)}
          trailColor="transparent"
          width="100px"
        />
      </BattleInfo>
    </BattleInfoContainer>
  );
};

export default BattleStatCards;

const BattleInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4rem 2rem;
  width: 100%;
`;

const BattleInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0008;
  color: #fff;
  padding: 0.75rem 1rem 0.5rem;
  gap: 1rem;
  width: fit-content;
  border-radius: 0.5rem;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  span {
    font-family: 'Press Start 2P', monospace;
    letter-spacing: 2px;
    transform: scaleX(0.6);
    transform-origin: left;
    margin-right: -2rem;
  }
`;

const HP = styled.span`
  font-weight: bold;
  color: #fff;
  font-family: 'Press Start 2P', monospace;
`;
