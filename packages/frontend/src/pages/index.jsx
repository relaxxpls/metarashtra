import { gql } from "@apollo/client";
import { ethers } from "ethers";
import Head from "next/head";
import { HiOutlineLink } from "react-icons/hi";
import Web3Modal from "web3modal";

import client from "../apollo-client";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
};

const Home = ({ countries }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Free NFTs!</title>
        <meta
          name="description"
          content="Free color NFTs! Only 10000 available."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.grid}>
        {countries?.map((country) => (
          <div key={country.code} className={styles.card}>
            <h3>
              <a
                href={`#${country.name}`}
                aria-hidden="true"
                className="aal_anchor"
                id={`#${country.name}`}
              >
                <HiOutlineLink size="20" />
              </a>
              {country.name}
            </h3>

            <p>
              {country.code} - {country.emoji}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
