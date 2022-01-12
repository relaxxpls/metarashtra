import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import GameContainer from '../../components/Game/GameContainer';

const Game = () => {
  const { active } = useWeb3React();
  const router = useRouter();

  useEffect(() => {
    if (!active) router.push('/login');
  }, [active, router]);

  if (!active) return null;

  return (
    <>
      <Head>
        <title>Play - Metarashtra</title>
        <meta name="description" content="Login" />
      </Head>

      <GameContainer />
    </>
  );
};

export default Game;
