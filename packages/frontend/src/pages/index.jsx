import Head from "next/head";

import HomeContainer from "../components/Home/HomeContainer";

const Home = () => {
  return (
    <>
      <Head>
        <title>MetaRashtra</title>
        <meta name="description" content="Mera Rashtra, MetaRashtra." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainer />
    </>
  );
};

export default Home;
