import contractAddress from '@metarashtra/smart-contracts/address.json';
import MetaYoddha from '@metarashtra/smart-contracts/artifacts/contracts/MetaYoddha.sol/MetaYoddha.json';
import { ethers } from 'ethers';
import { useState, useRef, useEffect } from 'react';

const useMetaYoddhaContract = () => {
  const contract = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setup = async () => {
      setLoading(true);

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_ETH_RPC_URL
      );
      // const balance = await provider.getBalance(address);
      // console.log(balance)

      contract.current = new ethers.Contract(
        contractAddress.MetaYoddhaAddress,
        MetaYoddha.abi,
        provider.getSigner()
      );

      setLoading(false);
    };

    setup();

    return () => {
      contract.current = null;
    };
  }, []);

  // const mint = async (to, tokenURI) => {

  return { contractLoading: loading, contract: contract.current };
};

export default useMetaYoddhaContract;
