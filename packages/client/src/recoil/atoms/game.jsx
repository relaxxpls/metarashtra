import { atom } from 'recoil';

export const freeroamState = atom({
  key: 'freeroamState',
  default: {
    isDisconnected: false,
    isPaused: false,
    loading: false,
  },
});

export const battleState = atom({
  key: 'battleState',
  default: {
    status: false,
    opponent: null,
    stats: {
      health: 100,
      mana: 100,
    },
  },
});
