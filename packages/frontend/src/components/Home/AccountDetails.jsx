import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

const ChainId = () => {
  const { chainId } = useWeb3React();

  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ''}</span>
    </>
  );
};

const BlockNumber = () => {
  const { chainId, library } = useWeb3React();

  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    if (!library) return () => {};

    let stale = false;

    const getBlockNumber = async () => {
      try {
        const response = await library.getBlockNumber();
        if (!stale) {
          setBlockNumber(response);
        }
      } catch (e) {
        if (!stale) {
          setBlockNumber(null);
        }
      }
    };
    getBlockNumber();

    const updateBlockNumber = (_blockNumber) => {
      setBlockNumber(_blockNumber);
    };
    library.on('block', updateBlockNumber);

    return () => {
      stale = true;
      library.removeListener('block', updateBlockNumber);
      setBlockNumber(undefined);
    };
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Block Number</span>
      <span role="img" aria-label="numbers">
        🔢
      </span>
      <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
    </>
  );
};

const Account = () => {
  const { account } = useWeb3React();

  return (
    <>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ''}
      </span>
    </>
  );
};

const Balance = () => {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = useState();

  useEffect(() => {
    if (!(account && library)) return () => {};

    let stale = false;

    const getBalance = async () => {
      try {
        const response = await library.getBalance(account);
        if (!stale) {
          setBalance(response);
        }
      } catch (e) {
        if (!stale) {
          setBalance(null);
        }
      }
    };

    getBalance();

    return () => {
      stale = true;
      setBalance(undefined);
    };
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>{balance ? `Ξ${ethers.utils.formatEther(balance)}` : ''}</span>
    </>
  );
};

const AccountDetails = () => (
  <h3
    style={{
      display: 'grid',
      gridGap: '1rem',
      gridTemplateColumns: '1fr min-content 1fr',
      maxWidth: '20rem',
      lineHeight: '2rem',
      margin: 'auto',
    }}
  >
    <ChainId />
    <BlockNumber />
    <Account />
    <Balance />
  </h3>
);

export default AccountDetails;
