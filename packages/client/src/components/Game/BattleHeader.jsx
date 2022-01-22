import { Progress } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { battleState, profileState } from '../../recoil/atoms';

const BattleHeader = ({ socket }) => {
  const [battle, setBattle] = useRecoilState(battleState);
  const profile = useRecoilValue(profileState);
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (!socket?.connected) return;

    socket.on('battle:stats', (payload) => {
      console.log(payload);
    });
  }, [socket]);

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
  const player = profile.username;
  const { opponent } = battle;

  return (
    <BattleInfoContainer>
      <Title>
        {player} v/s {opponent}
      </Title>

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

export default BattleHeader;

const Title = styled.h1`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 2rem;
  transform: translate(-50%, 0);
  font-family: 'Press Start 2P', monospace;
  font-size: 0.75rem;
  color: #fff;
  background-color: #000a;
  backdrop-filter: blur(0.25rem);
  border-radius: 8px;
`;

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
  backdrop-filter: blur(0.25rem);
  color: #fff;
  padding: 1rem;
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
