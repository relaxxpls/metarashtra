import { useWeb3React } from "@web3-react/core";
import { Button, message, Spin } from "antd";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

import { injected, walletconnect } from "../../connectors";

const MESSAGE = "I accept relaxxpls as god.";

export const LoggedinContainer = () => {
  const { account, deactivate, library } = useWeb3React();
  const [loading, setLoading] = useState(false);

  if (!(library && account)) return null;

  const handleSignMessage = async () => {
    try {
      setLoading(true);
      const signature = await library.getSigner(account).signMessage(MESSAGE);
      console.log(signature);
      message.success("Success on the signature!");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = () => {
    deactivate();
    message.success("Logged out succesfully");
  };

  return (
    <Container>
      <h1>Welcome {account}</h1>

      <Spin spinning={loading}>
        <WalletList>
          <StyledButton type="primary" onClick={handleSignMessage}>
            Sign Message
          </StyledButton>

          <StyledButton type="primary" danger onClick={handleDeactivate}>
            Logout
          </StyledButton>
        </WalletList>
      </Spin>
    </Container>
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
    <Container>
      <h1>Choose your wallet</h1>

      <Spin spinning={loading}>
        <WalletList>
          <StyledButton
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
          </StyledButton>

          <StyledButton
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
          </StyledButton>
        </WalletList>
      </Spin>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: fit-content;
  padding: 3rem 2rem;
  border: 1px solid lightgrey;
  border-radius: 8px;
  margin: 5rem auto;
  height: fit-content;
  background: #ffffff;
`;

const WalletList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid lightgray;
  border-radius: 8px;
  padding: 1rem;
  flex: 0 0 10rem;

  &:focus,
  &:hover {
    border-color: darkgray;
  }
`;
