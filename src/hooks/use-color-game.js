import { useCallback } from "react";
import useSessionStorage from "./use-session-storage";
import { useState, useLayoutEffect } from "react";

const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008080",
  "#FFC0CB",
  "#FFD700",
  "#8A2BE2",
  "#A52A2A",
  "#5F9EA0",
  "#7FFF00",
  "#D2691E",
  "#DC143C",
  "#20B2AA",
  "#32CD32",
  "#FF4500",
  "#DA70D6",
  "#B0E0E6",
  "#6A5ACD",
  "#FF6347",
  "#40E0D0",
  "#9ACD32",
  "#BA55D3",
  "#CD5C5C",
  "#8B4513",
  "#2E8B57",
  "#4682B4",
  "#DDA0DD",
  "#FF8C00",
  "#90EE90",
  "#C71585",
  "#F08080",
  "#008B8B",
  "#FF69B4",
  "#DAA520",
  "#D8BFD8",
  "#8FBC8F",
  "#708090",
];

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const generateColorOptions = (targetColor) => {
  const options = [targetColor];
  while (options.length < 6) {
    const color = getRandomColor();
    if (!options.includes(color)) {
      options.push(color);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};

export const useColorGame = () => {
  const [gameState, setGameState] = useSessionStorage("color-game-state", {
    targetColor: "",
    colorOptions: [],
    score: 0,
  });

  const [gameStatus, setGameStatus] = useState(null);

  const startNewRound = useCallback(() => {
    const newTargetColor = getRandomColor();
    const newColorOptions = generateColorOptions(newTargetColor);

    setGameState((prevState) => ({
      ...prevState,
      targetColor: newTargetColor,
      colorOptions: newColorOptions,
    }));
    setGameStatus(null);
  }, [setGameState, setGameStatus]);

  const handleColorGuess = useCallback(
    (color) => {
      if (color === gameState.targetColor) {
        setGameState((prevState) => ({
          ...prevState,
          score: prevState.score + 1,
        }));
        setGameStatus("🎉🎉🎉 Correct!");
        setTimeout(() => startNewRound(), 1500);
      } else {
        setGameStatus("😵 Wrong, try again!");
      }
    },
    [gameState.targetColor, setGameState, setGameStatus, startNewRound]
  );

  const resetGame = useCallback(() => {
    setGameState({
      targetColor: "",
      colorOptions: [],
      score: 0,
    });
  }, [setGameState]);

  useLayoutEffect(() => {
    if (gameState.targetColor === "") {
      startNewRound();
    }
  }, [gameState.targetColor, startNewRound]);

  return {
    targetColor: gameState.targetColor,
    colorOptions: gameState.colorOptions,
    score: gameState.score,
    gameStatus,
    handleColorGuess,
    resetGame,
    clearGameStatus: () => setGameStatus(null),
  };
};
