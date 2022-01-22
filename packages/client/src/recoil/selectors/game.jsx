import { selector } from 'recoil';

import { battleState, profileState } from '../atoms';

export const filteredPlayerState = selector({
  key: 'filteredPlayerState',
  get: ({ get }) => {
    const battle = get(battleState);
    const profile = get(profileState);
    return battle.players.find(
      (player) => player.username === profile.username
    );
  },
});

export const filteredOpponentState = selector({
  key: 'filteredOpponentState',
  get: ({ get }) => {
    const battle = get(battleState);
    const profile = get(profileState);
    return battle.players.find(
      (player) => player.username !== profile.username
    );
  },
});
