import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';

import { PageCard } from '../shared/Page';

import AccountDetails from './AccountDetails';

const HomeContainer = () => {
  const { active } = useWeb3React();

  if (!active) {
    return (
      <PageCard>
        <h1>
          Kindly <Link href="/login">login</Link> via your favorite wallet
        </h1>
      </PageCard>
    );
  }

  return (
    <PageCard>
      <h1>
        Click <Link href="/play">here</Link> to play!
      </h1>

      <AccountDetails />
    </PageCard>
  );
};

export default HomeContainer;
