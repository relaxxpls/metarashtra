import styled from 'styled-components';

import Button from '../shared/Button';

// ? pause menu
const GameOverlay = () => (
  <Container>
    <p className="large">Game Over</p>
    {/* <p className="final-score">
            {newHighscore ? `🎉 New Highscore 🎉` : `You scored: ${score}`}
          </p>
          {!running && isLost && (
            <button onClick={startGame}>
              {countDown === 4 ? "Restart Game" : countDown}
            </button>
          )} */}

    <Button
      type="primary"
      // onClick={startGame}
    >
      Restart Game
      {/* {countDown === 4 ? "Restart Game" : countDown} */}
    </Button>
  </Container>
);

export default GameOverlay;

const Container = styled.div`
  width: 100%;
  height: 381px;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 4px 4px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0;

  p {
    padding: 0;
    margin: 0;

    &.large {
      margin: 12px 0 0 0;
      font-size: 28px;
      font-weight: 600;
    }

    &.final-score {
      font-size: 16px;
      margin: 6px 0 0 0;
      font-weight: 300;

      + button {
        margin: 18px 0 0 0;
      }
    }
  }
`;
