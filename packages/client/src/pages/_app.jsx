import { ApolloProvider } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { RecoilRoot } from 'recoil';

import client from '../apollo-client';
import '../styles/globals.css';

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;

  return library;
};

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Web3ReactProvider>
  </RecoilRoot>
);

export default MyApp;
