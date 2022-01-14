import { useWeb3React } from '@web3-react/core';
import { Input, message, Spin, Tooltip } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { injected, walletconnect } from '../../connectors';
import profileState from '../../recoil/atoms/profile';
import Button from '../shared/Button';
import { PageCard } from '../shared/Page';

const MESSAGE = 'I accept relaxxpls as god.';

export const LoggedinContainer = () => {
  const { account, deactivate, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useRecoilState(profileState);

  useEffect(() => {
    if (account) {
      setProfile((_profile) => ({
        ..._profile,
        address: account,
      }));
    }
  }, [account, setProfile]);

  if (!(library && account)) return null;

  const handleSignMessage = async () => {
    try {
      setLoading(true);
      await library.getSigner(account).signMessage(MESSAGE);
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

  const handleUsername = (e) => {
    setProfile((_profile) => ({ ..._profile, username: e.target.value }));
  };

  return (
    <PageCard>
      <Spin spinning={loading}>
        <WalletList>
          <h1>Get started in 3 simple steps!</h1>
          <h2>Step 2: Create a Unique Username</h2>
          <h3>
            Welcome&nbsp;
            <Tooltip title={account}>{account.substring(0, 6)}!</Tooltip>
          </h3>

          <Input
            placeholder="Username"
            prefix={<HiOutlineUser size="20" />}
            size="large"
            showCount
            maxLength={20}
            value={profile.username}
            onChange={handleUsername}
          />

          <Button type="primary" onClick={handlePlayRedirect}>
            Play
          </Button>

          <Button onClick={handleSignMessage}>Sign Message</Button>
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
          <h1>Get started in 3 simple steps!</h1>
          <h2>Step 1: Choose Your Wallet</h2>

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
  text-transform: capitalize;

  h1,
  h2,
  h3 {
    margin: 0;
  }
`;
