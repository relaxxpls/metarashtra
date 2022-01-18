import styled from 'styled-components';

const Person = ({ isPlayer, username, location }) => {
  const pixelSize = 3;
  const { x, y, facing, walking } = location;

  return (
    <Character
      isPlayer={isPlayer}
      facing={facing}
      walking={walking}
      style={{
        transform: `translate3d(${x * pixelSize}px, ${y * pixelSize}px, 0 )`,
      }}
    >
      <span className="name">{username}</span>
      <div className="spritesheet" />
      <div className="shadow" />
    </Character>
  );
};

export default Person;

const backgroundPosition = {
  right: 'calc( var(--pixel-size) * -32 )',
  up: 'calc( var(--pixel-size) * -64 )',
  left: 'calc( var(--pixel-size) * -96 )',
  down: '0px',
};

const Character = styled.div`
  width: calc(var(--grid-cell) * 2);
  height: calc(var(--grid-cell) * 2);
  position: absolute;
  overflow: hidden;
  z-index: 1;

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    padding: 2px 10px;
    top: 0;
    left: 50%;
    max-width: calc(var(--grid-cell) * 2);
    transform: translate(-50%, 50%);
    background: #f5f5f5cc;
    white-space: nowrap;
    font-family: Monospace;
    font-weight: bold;
    border-radius: 8px;
  }

  .shadow {
    width: calc(var(--grid-cell) * 2);
    height: calc(var(--grid-cell) * 2);
    position: absolute;
    left: 0;
    top: 0;
    background: url(${({ isPlayer }) =>
      isPlayer
        ? 'images/sprite/CharacterShadowActive.webp'
        : 'images/sprite/CharacterShadow.webp'});
    background-size: 100%;
  }

  .spritesheet {
    position: absolute;
    background: url('images/sprite/Character.webp') no-repeat no-repeat;
    background-size: 100%;
    width: calc(var(--grid-cell) * 8);
    height: calc(var(--grid-cell) * 8);
    background-position-y: ${({ facing }) => backgroundPosition[facing]};

    ${({ walking }) =>
      walking &&
      `
    animation: walkAnimation 0.6s steps(4) infinite;
      `}
  }

  @keyframes walkAnimation {
    from {
      transform: translate3d(0%, 0%, 0);
    }
    to {
      transform: translate3d(-100%, 0%, 0);
    }
  }
`;
