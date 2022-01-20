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
