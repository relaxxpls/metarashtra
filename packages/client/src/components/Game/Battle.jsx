import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { battleState, profileState } from '../../recoil/atoms';

const Battle = () => {
  const [battle, setBattle] = useRecoilState(battleState);
  const profile = useRecoilValue(profileState);

  return (
    <BattleContainer>
      <h1>
        {battle.opponent} v/s {profile.username}
      </h1>
    </BattleContainer>
  );
};

export default Battle;

const BattleContainer = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;
