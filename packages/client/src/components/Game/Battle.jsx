import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { battleState, profileState } from '../../recoil/atoms';

const Battle = () => {
  const [battle, setBattle] = useRecoilState(battleState);
  const profile = useRecoilValue(profileState);

  return (
    <BattleContainer>
      <Title>
        {battle.opponent} v/s {profile.username}
      </Title>
    </BattleContainer>
  );
};

export default Battle;

const BattleContainer = styled.div`
  height: 100%;
  width: 100%;
  background: url('images/terrain/battle.png');
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
