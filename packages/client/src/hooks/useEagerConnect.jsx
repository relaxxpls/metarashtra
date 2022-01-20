import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

import { injected } from '../connectors';

const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const activateAsync = async () => {
      const isAuthorized = await injected.isAuthorized();

      if (!isAuthorized) {
        setTried(true);
        return;
      }

      try {
        await activate(injected, undefined, true);
      } catch (error) {
        setTried(true);
      }
    };

    activateAsync();
  }, [activate]);

  // ? if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) setTried(true);
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;
