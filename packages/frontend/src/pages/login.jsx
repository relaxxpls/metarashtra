import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';

import {
  LoginContainer,
  LoggedinContainer,
} from '../components/Login/LoginContainer';

const Login = () => {
  const { active } = useWeb3React();

  return (
    <>
      <Head>
        <title>Login - Metarashtra</title>
        <meta name="description" content="Login" />
      </Head>

      {active ? <LoggedinContainer /> : <LoginContainer />}
    </>
  );
};

export default Login;

// import { useEagerConnect, useInactiveListener } from "../../hooks";
// // ? handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
// const triedEager = useEagerConnect();
// // ? handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
// useInactiveListener(!triedEager || !!activatingConnector);
