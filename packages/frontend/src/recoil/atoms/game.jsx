import { atom } from 'recoil';

const gameStatusState = atom({
  key: 'gameState',
  default: {
    isDisconnected: false,
    isPaused: false,
    loading: false,
  },
});

export default gameStatusState;
