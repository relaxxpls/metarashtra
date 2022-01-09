import { Button } from "antd";
import Image from "next/image";
import styled from "styled-components";

const LoginContainer = () => {
  const metamaskClick = () => {};

  return (
    <Container>
      <h1>Choose your wallet</h1>

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
          onClick={metamaskClick}
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
          onClick={metamaskClick}
        >
          WalletConnect
        </StyledButton>
      </WalletList>
    </Container>
  );
};

export default LoginContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 100vh;
`;

const WalletList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 1rem;
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
