import { atom } from 'recoil';

const profileState = atom({
  key: 'profileState',
  default: {
    username: null,
    room: null,
    address: null,
    nftsOwned: [],
    coins: 1_000_000,
    score: 0,
  },
});

export default profileState;
