import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import styled from "styled-components";

import AccountDetails from "./AccountDetails";

const HomeContainer = () => {
  const { active } = useWeb3React();

  if (!active) {
    return (
      <Container>
        Kindly <Link href="/login">login</Link> via your favorite wallet
      </Container>
    );
  }

  return <AccountDetails />;
};

export default HomeContainer;

const Container = styled.h1`
  a {
    text-decoration: underline;
  }
`;
