import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import styled from 'styled-components';

import { gameState, profileState } from '../../recoil/atoms';

import CharacterChoice from './CharacterChoice';
import Game from './Game';
import GamePause from './GamePause';

const GameContainer = () => {
  const profile = useRecoilValue(profileState);
  const socket = useRef(null);
  const status = useRecoilValue(gameState);

  const handleJoin = () => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      forceNew: true,
      transports: ['websocket'],
    });
  };

  useEffect(() => {
    if (socket.current === null) handleJoin();
  }, []);

  const paused = status.isPaused || status.isDisconnected || status.loading;

  if (!profile.nftId) return <CharacterChoice />;

  return (
    <Container>
      <Frame paused={paused}>
        <Game socket={socket.current} />
      </Frame>

      {paused && <GamePause socket={socket.current} />}
    </Container>
  );
};

export default GameContainer;

const Container = styled.div`
  --pixel-size: 2px;
  --grid-cell: calc(var(--pixel-size) * 16);
  --bg: #9fa7e4;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 700px) {
    --pixel-size: 3px;
  }

  @media (min-width: 1000px) {
    --pixel-size: 4px;
  }
`;

const Frame = styled.div`
  width: calc(var(--pixel-size) * 160);
  height: calc(var(--pixel-size) * 144);
  outline: var(--pixel-size) solid #fff;
  z-index: 1;
  position: relative;
  user-select: none;

  ${({ paused }) =>
    paused &&
    `
  filter: blur(8px);
  pointer-events: none;
    `};
`;
