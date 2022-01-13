import Image from 'next/image';
import styled from 'styled-components';

const GameControls = () => (
  <Dpad>
    <Button type="button" className="left">
      <Image src="/images/dpad/left.svg" layout="fill" alt="Dpad Left Button" />
    </Button>

    <Button type="button" className="up">
      <Image src="/images/dpad/up.svg" layout="fill" alt="Dpad Up Button" />
    </Button>

    <Button type="button" className="down">
      <Image src="/images/dpad/down.svg" layout="fill" alt="Dpad Down Button" />
    </Button>

    <Button type="button" className="right">
      <Image
        src="/images/dpad/right.svg"
        layout="fill"
        alt="Dpad Right Button"
      />
    </Button>
  </Dpad>
);

export default GameControls;

const Dpad = styled.div`
  position: absolute;
  right: calc(var(--pixel-size) * 2);
  bottom: calc(var(--pixel-size) * 2);
  width: calc(var(--pixel-size) * 37);
  height: calc(var(--pixel-size) * 38);
  z-index: 2;
  user-select: none;
`;

const Button = styled.div`
  appearance: none;
  position: absolute;
  height: calc(var(--pixel-size) * 13);
  width: calc(var(--pixel-size) * 13);
  padding: 0;
  outline: 0;
  border: 0;
  background: transparent;
  cursor: pointer;

  &.up {
    left: calc(var(--pixel-size) * 12);
    top: 0;
  }

  &.down {
    bottom: var(--pixel-size);
    left: calc(var(--pixel-size) * 12);
  }

  &.left {
    top: calc(var(--pixel-size) * 12);
    left: 0;
  }

  &.right {
    top: calc(var(--pixel-size) * 12);
    right: 0;
  }

  &:active {
    .Arrow_arrow-inset {
      stroke: #07c2cc;
    }

    .Arrow_arrow-body {
      stroke: #17dfea;
    }
  }
`;
