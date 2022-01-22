import styled from 'styled-components';

import BattleHeader from './BattleHeader';
import BattleMove from './BattleMoves';

const Battle = ({ socket }) => (
  <BattleContainer>
    <BattleHeader socket={socket} />

    <MoveContainer>
      <BattleMove title="Kick" timeout={2000} color="#E97461" socket={socket} />
      <BattleMove
        title="Brace"
        timeout={1000}
        color="#008DF0"
        socket={socket}
      />
      <BattleMove title="Heal" timeout={5000} color="#00C19A" socket={socket} />
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
