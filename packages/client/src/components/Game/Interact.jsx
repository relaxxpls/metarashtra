import { Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const interactions = {
  battle: {
    request: {
      Message: ({ username }) => (
        <>
          Press <Typography.Text keyboard>Space</Typography.Text> to challenge
          <b> {username} </b>
          to a battle!
        </>
      ),
      onKeyPress:
        ({ socket, username }) =>
        (event) => {
          if (event.key === ' ' && username) {
            socket.emit('battle:request', { opponent: username });
          }
        },
    },
    requestRecieved: {
      Message: ({ opponent }) => (
        <>
          <b> {opponent} </b> challenged you to a battle! Press
          <Typography.Text keyboard>Space</Typography.Text> to accept, or
          <Typography.Text keyboard>Esc</Typography.Text> to reject.
        </>
      ),
      onKeyPress:
        ({ socket, opponent }) =>
        (event) => {
          if (event.key === ' ' && opponent) {
            socket.emit('battle:accept', { opponent });
          } else if (event.key === 'Escape') {
            socket.emit('battle:reject', { opponent });
          }
        },
    },
  },
};

const Interact = ({ socket, player, users }) => {
  const [interaction, setInteraction] = useState(null);

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

      return {
        Message: (
          <interactions.battle.request.Message
            username={nearbyPlayer.username}
          />
        ),
        onKeyPress: interactions.battle.request.onKeyPress({
          socket,
          username: nearbyPlayer.username,
        }),
      };
    });
  }, [nearbyPlayer, socket]);

  useEffect(() => {
    if (interaction === null) return () => {};
    document.addEventListener('keypress', interaction.onKeyPress);

    return () => {
      document.removeEventListener('keypress', interaction.onKeyPress);
    };
  }, [interaction]);

  useEffect(() => {
    socket.on('battle:request', ({ opponent }) => {
      setInteraction((_interaction) => {
        if (!nearbyPlayer) return null;
        const { Message, onKeyPress } = interactions.battle.requestRecieved;

        return {
          Message: <Message opponent={opponent} />,
          onKeyPress: onKeyPress({ socket, opponent }),
        };
      });
    });
  }, [socket, nearbyPlayer]);

  if (interaction === null) return null;

  return (
    <Container>
      <h3>
        {interaction.Message}

        {/* Press <Typography.Text keyboard>Space</Typography.Text> to challenge
        <b> {nearbyPlayer.username} </b>
        to a battle! */}
      </h3>
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
  padding: 0.75rem 1rem;
  background: #ffffffee;
  border-radius: 8px;

  h3 {
    margin: 0;
  }

  @media (max-width: 700px) {
    transform: scale(0.8);
  }
`;
