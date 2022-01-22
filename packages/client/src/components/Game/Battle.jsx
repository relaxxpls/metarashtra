import styled from 'styled-components';

import BattleHeader from './BattleHeader';
import BattleMove from './BattleMoves';

const moves = [
  {
    id: 1,
    title: 'Kick',
    timeout: 2000,
    color: '#E97461',
    type: 'attack',
    value: 10,
  },
  {
    id: 2,
    title: 'Brace',
    timeout: 1000,
    color: '#008DF0',
    type: 'defence',
    value: 5,
  },
  {
    id: 3,
    title: 'Eat laddoo',
    timeout: 5000,
    color: '#00C19A',
    type: 'heal',
    value: 5,
  },
  {
    id: 4,
    title: 'Punch',
    timeout: 4000,
    color: '#E97461',
    type: 'attack',
    value: 15,
  },
];

const Battle = ({ socket }) => (
  <BattleContainer>
    <BattleHeader socket={socket} />

    <MoveContainer>
      {moves.map((move) => (
        <BattleMove key={move.id} move={move} socket={socket} />
      ))}
    </MoveContainer>
  </BattleContainer>
);

export default Battle;

const BattleContainer = styled.div`
  height: 100%;
  width: 100%;
  background-image: url('images/terrain/battle.png');
  background-size: 100%;
  image-rendering: pixelated;
`;

const MoveContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  background: #0006;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 80%
  );
  padding: 0.5rem;
  overflow: auto hidden;
`;
