import { atom } from 'recoil';

const profileState = atom({
  key: 'profileState',
  default: {
    username: null,
    address: null,
    nftId: null,
  },
});

export default profileState;
