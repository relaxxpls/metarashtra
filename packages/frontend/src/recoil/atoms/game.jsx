import { atom } from 'recoil';

const gameStatusState = atom({
  key: 'gameState',
  default: {
    isDisconnected: false,
    isPaused: false,
    loading: true,
  },
});

export default gameStatusState;
