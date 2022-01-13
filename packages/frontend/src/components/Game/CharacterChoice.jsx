import { message, Progress, Tooltip } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import styled from 'styled-components';

import Button from '../shared/Button';

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

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        setLoading(true);
        const result = await fetch('/api/kingdoms');

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
    console.log(choice);
  };

  if (loading) return null;

  return (
    <CharacterList>
      {choices.map(({ id, name, image, description, stats }) => (
        <li key={id}>
          <Character
            name={name}
            image={image}
            description={description}
            stats={stats}
            handleChoice={handleCharacterChoice(id)}
          />
        </li>
      ))}
    </CharacterList>
  );
};

export default CharacterChoice;

const CharacterList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background: #ffffff55;
  padding: 1rem;
  border-radius: 8px;
`;

const CharacterContainer = styled.button`
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
