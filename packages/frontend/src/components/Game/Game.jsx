import { useRecoilValue } from 'recoil';

import profileState from '../../recoil/atoms/profile';

import CharacterChoice from './CharacterChoice';
import GameContainer from './GameContainer';

const Game = () => {
  const profile = useRecoilValue(profileState);

  return profile.nftId ? <GameContainer /> : <CharacterChoice />;
};

export default Game;
