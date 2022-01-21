import { useRecoilState, useRecoilValue } from 'recoil';

import { battleState, profileState } from '../../recoil/atoms';

const Battle = () => {
  const [battle, setBattle] = useRecoilState(battleState);
  const profile = useRecoilValue(profileState);

  return (
    <div>
      <h1>
        {battle.opponent} v/s {profile.username}
      </h1>
    </div>
  );
};

export default Battle;
