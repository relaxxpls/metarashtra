import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { freeroamState, profileState } from '../../recoil/atoms';
import Person from '../Person/Person';

import GameControls from './GameControls';
import GameScore from './GameScoreboard';
import Interact from './Interact';

// TODO: Make the game dynamic (i.e. based on the room name)
// TODO: Add a "waiting for players" screen
// TODO: Limit the number of players
const Game = ({ socket }) => {
  const [status, setStatus] = useRecoilState(freeroamState);
  const profile = useRecoilValue(profileState);

  const [users, setUsers] = useState([]);
  const [player, setPlayer] = useState({});

  const handleDisconnect = useCallback(() => {
    socket.emit('exit');
    setUsers([]);
    setStatus((_status) => ({ ..._status, isDisconnected: true }));
  }, [setStatus, socket]);

  useEffect(() => {
    if (!socket?.connected) return;

    socket.emit('join', profile);

    socket.on('updateRoomState', (payload) => {
      if (payload.length === 0) handleDisconnect();
      else setUsers(payload);
    });

    socket.on('userState', (payload) => {
      setPlayer(payload);
    });

    socket.on('disconnect', handleDisconnect);
  }, [profile, setStatus, socket, handleDisconnect]);

  const handlePause = () => {
    setStatus({ ...status, isPaused: true });
    socket?.emit('pause');
  };

  const pixelSize = 3;
  const { x, y } = player?.location ?? { x: 0, y: 0 };

  return (
    <>
      <GameScore handlePause={handlePause} />
      {socket?.connected && <GameControls socket={socket} />}

      <Camera>
        <Map
          style={{
            transform: `translate3d(${(66 - x) * pixelSize}px, ${
              (42 - y) * pixelSize
            }px, 0 )`,
          }}
        >
          {users.map((user) => (
            <Person
              key={user.username}
              isPlayer={user.username === profile.username}
              username={user.username}
              location={user.location}
            />
          ))}
        </Map>

        {socket?.connected && (
          <Interact socket={socket} player={player} users={users} />
        )}
      </Camera>
    </>
  );
};

export default Game;

const Camera = styled.div`
  width: calc(var(--pixel-size) * 160);
  height: calc(var(--pixel-size) * 144);
  overflow: hidden;
  background: #61ddf7;
  position: relative;
`;

const Map = styled.div`
  image-rendering: pixelated;
  background: url('images/terrain/CameraDemoMap.webp');
  background-size: 100%;
  width: calc(13 * var(--grid-cell));
  height: calc(10 * var(--grid-cell));
  position: relative;
`;
