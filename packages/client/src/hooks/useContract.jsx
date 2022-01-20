import { useWeb3React } from '@web3-react/core';
import { message } from 'antd';
import { ethers } from 'ethers';
import { useMemo } from 'react';

const useContract = ({ address, abi }) => {
  const { library, account, chainId } = useWeb3React();

  const constract = useMemo(() => {
    if (!address || !abi || !library || !chainId) return null;

    try {
      return new ethers.Contract(address, abi, library.getSigner(account));
    } catch (error) {
      message.error(error.message);
      return null;
    }
  }, [address, abi, library, account, chainId]);

  return constract;
};

export default useContract;
