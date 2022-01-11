import { useWeb3React } from '@web3-react/core';
import { message, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { injected, walletconnect } from '../../connectors';
import Button from '../shared/Button';
import { PageCard } from '../shared/Page';

const MESSAGE = 'I accept relaxxpls as god.';

export const LoggedinContainer = () => {
  const { account, deactivate, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!(library && account)) return null;

  const handleSignMessage = async () => {
    try {
      setLoading(true);
      const signature = await library.getSigner(account).signMessage(MESSAGE);
      console.log(signature);
      message.success('Success on the signature!');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = () => {
    deactivate();
    message.success('Logged out succesfully');
  };

  const handlePlayRedirect = () => {
    message.success('Redirecting to the game...');
    router.push('/play');
  };

  return (
    <PageCard>
      <Spin spinning={loading}>
        <WalletList>
          <h1>Welcome {account}</h1>
          <Button onClick={handleSignMessage}>Sign Message</Button>

          <Button type="primary" onClick={handlePlayRedirect}>
            Play
          </Button>

          <Button type="primary" danger onClick={handleDeactivate}>
            Logout
          </Button>
        </WalletList>
      </Spin>
    </PageCard>
  );
};

export const LoginContainer = () => {
  const { activate } = useWeb3React();

  const [loading, setLoading] = useState(false);

  const handleLogin = (connector) => async () => {
    try {
      setLoading(true);
      await activate(connector, undefined, true);
    } catch (error) {
      message.error(error.message);
      if (connector?.walletConnectProvider) {
        // eslint-disable-next-line no-param-reassign
        connector.walletConnectProvider = undefined;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageCard>
      <Spin spinning={loading}>
        <WalletList>
          <h1>Choose Your Wallet</h1>

          <Button
            type="text"
            size="large"
            icon={
              <Image
                src="/images/metamask.svg"
                height={24}
                width={24}
                alt="MetaMask logo"
              />
            }
            onClick={handleLogin(injected)}
          >
            MetaMask
          </Button>

          <Button
            type="text"
            size="large"
            icon={
              <Image
                src="/images/walletconnect.svg"
                height={24}
                width={24}
                alt="MetaMask logo"
              />
            }
            onClick={handleLogin(walletconnect)}
          >
            WalletConnect
          </Button>
        </WalletList>
      </Spin>
    </PageCard>
  );
};

const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
`;
