import { useWeb3React } from '@web3-react/core';
import { message, Spin } from 'antd';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

const AccountDetails = () => {
  const { account, chainId, library } = useWeb3React();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(account && library)) return () => {};
    let stale = false;

    const getBalance = async () => {
      setLoading(true);
      try {
        const response = await library.getBalance(account);
        if (!stale) setBalance(response);
      } catch (error) {
        message.error(error.message);
        if (!stale) setBalance(null);
      } finally {
        setLoading(false);
      }
    };
    getBalance();

    // ? ensures refresh if referential identity
    // ? of library doesn't change across chainIds
    return () => {
      stale = true;
      setBalance(null);
    };
  }, [account, library, chainId]);

  return (
    <Spin spinning={loading}>
      <div
        style={{
          display: 'grid',
          gridGap: '0.5rem',
          gridTemplateColumns: 'min-content 1fr 1fr',
          maxWidth: '20rem',
          margin: 'auto',
          fontSize: '1.25rem',
        }}
      >
        <span>⛓</span>
        <span>Chain Id</span>
        <span>{chainId ?? ''}</span>

        <span>🤖</span>
        <span>Account</span>
        <span>
          {account &&
            `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`}
        </span>

        <span>💰</span>
        <span>Balance</span>
        <span>{balance && ethers.utils.formatEther(balance)}</span>
      </div>
    </Spin>
  );
};

export default AccountDetails;
