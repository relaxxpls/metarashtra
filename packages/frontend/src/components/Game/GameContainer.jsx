import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Person from "../Person/Person";

import GameFooter from "./GameFooter";
import GameOverlay from "./GameOverlay";

const drawRoom = (ctx) => {
  const terrainImage = new Image();
  terrainImage.src = "/images/terrain/base.jpg";
  terrainImage.onload = () => ctx.drawImage(terrainImage, 0, 0);

  // const houseImage = new Image();
  // houseImage.src = "/images/terrain/house.png";
  // houseImage.onload = () => ctx.drawImage(houseImage, 80, 60);
};

const GameContainer = () => {
  const canvasRef = useRef(null);
  const canvasWidth = 460;
  const canvasHeight = 460;
  const canvasGridSize = 20;

  const [isLost, setIsLost] = useState(false);

  const clearCanvas = (ctx) =>
    ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2);

  useEffect(() => {
    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && !isLost) {
      clearCanvas(ctx);
      drawRoom(ctx);
    }
  }, [isLost]);

  return (
    <main>
      <Canvas
        ref={canvasRef}
        width={canvasWidth + 1}
        height={canvasHeight + 1}
      />

      <Person isPlayer />
      <Person />
      <Person />
      <Person />
      <GameFooter />

      {isLost && <GameOverlay />}
    </main>
  );
};

export default GameContainer;

const Canvas = styled.canvas`
  background-color: white;
  box-shadow: 0px 2px 4px rgba(227, 233, 237, 0.5);
  border-radius: 8px;
`;
