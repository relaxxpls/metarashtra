import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { battleState, profileState } from '../../recoil/atoms';

import BattleMove from './BattleMoves';
import BattleStatCards from './BattleStatCard';

const Battle = ({ socket }) => {
  const [battle, setBattle] = useRecoilState(battleState);
  const profile = useRecoilValue(profileState);

  return (
    <BattleContainer>
      <Title>
        {battle.opponent} v/s {profile.username}
      </Title>
      <BattleStatCards player={profile.username} opponent={battle.opponent} />

      <MoveContainer>
        <BattleMove
          title="Kick"
          timeout={2000}
          color="#E97461"
          socket={socket}
        />
        <BattleMove
          title="Brace"
          timeout={1000}
          color="#008DF0"
          socket={socket}
        />
        <BattleMove
          title="Heal"
          timeout={5000}
          color="#00C19A"
          socket={socket}
        />
      </MoveContainer>
    </BattleContainer>
  );
};

export default Battle;

const BattleContainer = styled.div`
  height: 100%;
  width: 100%;
  background-image: url('images/terrain/battle.png');
  background-size: 100%;
  image-rendering: pixelated;
`;

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
  font-weight: 400;
  background: #f5f5f5dd;
  border-radius: 8px;
`;

const MoveContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  background: #0006;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 80%
  );
  padding: 0.5rem;
  overflow: auto hidden;
`;
