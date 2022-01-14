import { useState } from 'react';

import CharacterChoice from './CharacterChoice';
import GameContainer from './GameContainer';

const Game = () => {
  const [user, setUser] = useState(false);

  return <div>{user ? <GameContainer /> : <CharacterChoice />}</div>;
};

export default Game;
