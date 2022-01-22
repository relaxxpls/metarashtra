import { Progress } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { battleState } from '../../recoil/atoms';
import {
  filteredOpponentState,
  filteredPlayerState,
} from '../../recoil/selectors';

const BattleHeader = ({ socket }) => {
  const setBattle = useSetRecoilState(battleState);
  const player = useRecoilValue(filteredPlayerState);
  const opponent = useRecoilValue(filteredOpponentState);

  useEffect(() => {
    if (!socket?.connected) return;

    socket.on('battle:update', (battle) => {
      setBattle((b) => ({ ...b, ...battle }));
    });
  }, [socket, setBattle]);

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

  return (
    <BattleInfoContainer>
      <Title>
        {player.username} v/s {opponent.username}
      </Title>

      <BattleInfo>
        <PlayerInfo>
          <span>{player.username}</span>
          <span>lvl 0</span>
        </PlayerInfo>

        <Progress
          type="circle"
          percent={player.health}
          format={getFormattedPercent}
          strokeColor={getColor(player.health)}
          trailColor="transparent"
          width="100px"
        />
      </BattleInfo>

      <BattleInfo>
        <PlayerInfo>
          <span>{opponent.username}</span>
          <span>lvl 0</span>
        </PlayerInfo>

        <Progress
          type="circle"
          percent={opponent.health}
          format={getFormattedPercent}
          strokeColor={getColor(opponent.health)}
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
