import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import profileState from '../../recoil/atoms/profile';

import CharacterChoice from './CharacterChoice';
import GameContainer from './GameContainer';

const Game = () => {
  const router = useRouter();
  const profile = useRecoilValue(profileState);
  if (!profile.username) router.push('/login');

  return profile.nftId ? <GameContainer /> : <CharacterChoice />;
};

export default Game;
