import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// ? Polygon (Currency: MATIC)
// * 137 - Mainnet
// * 80001 - Testnet Mumbai
// * ref: https://chainlist.org/
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: process.env.RPC_URL_1 },
  qrcode: true,
});
