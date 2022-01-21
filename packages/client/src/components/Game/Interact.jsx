import { Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { battleState } from '../../recoil/atoms';
import Button from '../shared/Button';

const Interact = ({ socket, player, users }) => {
  const [interaction, setInteraction] = useState(null);
  const setBattle = useSetRecoilState(battleState);

  const nearbyPlayer = useMemo(
    () =>
      users.find((user) => {
        const dx = Math.abs(user.location.x - player.location.x);
        const dy = Math.abs(user.location.y - player.location.y);

        return dx < 20 && dy < 20 && user.username !== player.username;
      }),
    [player, users]
  );

  // * If there is no nearby player, reset the interaction.
  // * Else If there is a nearby player & no interaction yet
  // * set the interaction to request a battle.
  useEffect(() => {
    setInteraction((_interaction) => {
      if (!nearbyPlayer) return null;
      if (_interaction !== null) return _interaction;
      const opponent = nearbyPlayer.username;

      return {
        Message: (
          <h3>
            Press <Typography.Text keyboard>Space</Typography.Text> to challenge
            <b> {opponent} </b>
            to a battle!
          </h3>
        ),
        onKeyDown: (event) => {
          if (event.key === ' ' && opponent) {
            socket.emit('battle:request', { opponent });
          }
        },
      };
    });
  }, [nearbyPlayer, socket]);

  useEffect(() => {
    if (interaction === null) return () => {};
    document.addEventListener('keydown', interaction.onKeyDown);

    return () => {
      document.removeEventListener('keydown', interaction.onKeyDown);
    };
  }, [interaction]);

  const handleCloseInteraction = () => setInteraction(null);

  useEffect(() => {
    socket.on('battle:request', ({ opponent }) => {
      setInteraction(() => {
        if (!nearbyPlayer) return null;

        return {
          Message: (
            <h3>
              <b> {opponent} </b> challenged you to a battle! Press
              <Typography.Text keyboard>Space</Typography.Text> to accept, or
              <Typography.Text keyboard>Esc</Typography.Text> to reject.
            </h3>
          ),
          onKeyDown: (event) => {
            if (event.key === ' ' && opponent)
              socket.emit('battle:accept', { opponent });
            else if (event.key === 'Escape')
              socket.emit('battle:reject', { opponent });
            handleCloseInteraction();
          },
        };
      });
    });

    socket.on('battle:reject', ({ opponent }) => {
      setInteraction({
        Message: (
          <h3>
            <b> {opponent} </b> rejected your battle offer. Try again later!
          </h3>
        ),
        onKeyDown: () => {},
      });
    });

    socket.on('battle:accept', ({ opponent }) => {
      setInteraction({
        Message: (
          <h3>
            <b> {opponent} </b> is ready to battle! The battle will begin
            shortly.
          </h3>
        ),
        onKeyDown: () => {},
      });

      setBattle((_battle) => ({
        ..._battle,
        status: true,
        opponent,
      }));
    });
  }, [socket, nearbyPlayer, setBattle]);

  if (interaction === null) return null;

  return (
    <Container>
      {interaction.Message}

      <Button
        type="text"
        shape="circle"
        size="small"
        icon={<HiOutlineX size="16" />}
        onClick={handleCloseInteraction}
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.5rem',
        }}
      />
    </Container>
  );
};

export default Interact;

const Container = styled.div`
  position: absolute;
  z-index: 3;
  left: 0;
  bottom: 0;
  margin: 0 8rem 0.5rem 0.5rem;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  background: #ffffffee;
  border-radius: 8px;

  h3 {
    margin: 0;
  }

  @media (max-width: 700px) {
    transform: scale(0.8);
  }
`;
