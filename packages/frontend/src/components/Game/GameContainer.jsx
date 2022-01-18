import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import styled from 'styled-components';

import { gameState, profileState } from '../../recoil/atoms';

import CharacterChoice from './CharacterChoice';
import Game from './Game';
import GamePause from './GamePause';

const GameContainer = () => {
  const profile = useRecoilValue(profileState);
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useRecoilState(gameState);

  const handleJoin = useCallback(() => {
    setStatus((_status) => ({ ..._status, loading: true }));

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      forceNew: true,
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      setSocket(newSocket);
      setStatus((_status) => ({ ..._status, loading: false }));
    });

    newSocket.on('disconnect', (reason) => {
      message.error(reason);
      setSocket(null);
      setStatus((_status) => ({ ..._status, isDisconnected: true }));
    });
  }, [setStatus]);

  useEffect(() => {
    if (!socket?.connected) handleJoin();
  }, [socket?.connected, handleJoin]);

  const paused = status.isPaused || status.isDisconnected || status.loading;

  if (!profile.nftId) return <CharacterChoice />;

  return (
    <Container>
      <Frame paused={paused}>
        <Game socket={socket} />
      </Frame>

      {paused && <GamePause socket={socket} />}
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
