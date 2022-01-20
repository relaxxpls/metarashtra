import contractAddress from '@metarashtra/smart-contracts/address.json';
import MetaYoddha from '@metarashtra/smart-contracts/artifacts/contracts/MetaYoddha.sol/MetaYoddha.json';
import { Empty, message, Progress, Tooltip } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useContract } from '../../hooks';
import { profileState } from '../../recoil/atoms';
import { Button } from '../shared';

const Character = ({ name, image, description, stats, handleChoice }) => (
  <CharacterContainer type="button" onClick={handleChoice}>
    <Image src={image} alt={name} width={128} height={128} />

    <Progress
      success={{
        percent:
          (100 * stats.strength) /
          (stats.strength + stats.agility + stats.intelligence),
      }}
      percent={
        (100 * (stats.strength + stats.agility)) /
        (stats.strength + stats.agility + stats.intelligence)
      }
      showInfo={false}
      trailColor="#ff0000"
    />

    <h1>{name}</h1>

    <Tooltip
      title={
        <p style={{ textAlign: 'justify' }}>
          <h4 style={{ color: '#ffffff' }}>Description:</h4>
          {description}
        </p>
      }
      trigger="click"
    >
      <Button type="text" style={{ border: 'none', padding: '0' }}>
        <HiOutlineInformationCircle size={24} />
      </Button>
    </Tooltip>
  </CharacterContainer>
);

// ? Character = NFT
const CharacterChoice = () => {
  const [loading, setLoading] = useState(true);
  const [choices, setChoices] = useState([]);
  const setProfile = useSetRecoilState(profileState);
  const contract = useContract({
    address: contractAddress.MetaYoddhaAddress,
    abi: MetaYoddha.abi,
  });

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        setLoading(true);
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/kingdoms/available`
        ).then((res) => res.json());

        setChoices(result);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChoices();
  }, []);

  const handleCharacterChoice = (choice) => () => {
    setProfile((_profile) => ({ ..._profile, ownedMetaYoddhas: [choice] }));
  };

  if (loading) return null;

  return (
    <CharacterChoiceContainer>
      <h2>Step 3: Choose your character</h2>

      <CharacterList>
        {choices.length ? (
          choices.map(({ id, name, image, description, stats }) => (
            <li key={id}>
              <Character
                name={name}
                image={image}
                description={description}
                stats={stats}
                handleChoice={handleCharacterChoice(id)}
              />
            </li>
          ))
        ) : (
          <Empty
            description={
              <>
                <h3>No characters available.</h3>
                <span>Be sure to check back later!</span>
              </>
            }
          />
        )}
      </CharacterList>
    </CharacterChoiceContainer>
  );
};

export default CharacterChoice;

const CharacterChoiceContainer = styled.div`
  background: #ffffff55;
  padding: 1rem;
  border-radius: 8px;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const CharacterList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: fit-content;

  h1 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  &:hover {
    transform: scale(1.06);
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;
