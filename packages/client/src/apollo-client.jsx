import { ApolloClient, InMemoryCache } from '@apollo/client';

// This is the official Uniswap v2 subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
// const client = new ApolloClient({
//   uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
// });

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});

export default client;
