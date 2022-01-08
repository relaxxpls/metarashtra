import { ApolloProvider } from "@apollo/client";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import client from "../apollo-client";
import "../styles/globals.css";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

const MyApp = ({ Component, pageProps }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </Web3ReactProvider>
);

export default MyApp;
