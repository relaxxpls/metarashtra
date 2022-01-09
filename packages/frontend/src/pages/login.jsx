import Head from "next/head";

import LoginContainer from "../components/Login/LoginContainer";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - Metarashtra</title>
        <meta name="description" content="Login" />
      </Head>

      <LoginContainer />
    </>
  );
};

export default Login;
