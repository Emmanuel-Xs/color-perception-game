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

const correctMessages = [
  "😎👌🔥 Correct!",
  "🎉 Awesome! You got it!",
  "✅ You're right!",
  "💝💐🏆 Perfect!",
  "👏🍾 Brilliant!",
  "🙌🧠 Fantastic!",
  "🔔🤩 Outstanding!",
  "˗ˏˋ ★ ˎˊ˗👍 Spot on!",
  "🥳👌 You nailed it!",
  "🚀😎 Amazing!",
  "🌟 Super job!",
  "💥 Boom, correct!",
  "🎊 Victory!",
  "👌 Nailed it!",
  "🔝⚡ Top-notch!",
  "🥇🍾✨ Champion!",
  "✨💫⭐️ Great work!",
  "👑 You're a star!",
  "🦸 Correct, hero!",
  "🔥✨❤️‍🔥 Flawless!",
];

const wrongMessages = [
  "😵 Wrong, try again!",
  "🥴🚩🎭 Oops, that's not it!",
  "😔 Not quite, try again!",
  "🚨🛠️ Incorrect! Give it another shot!",
  "😓 Almost, but not quite!",
  "🙁🙅‍♀️ No, that's not right!",
  "😕 Try once more!",
  "😩 Better luck next time!",
  "😢🚧 That's not correct!",
  "💔😑 Wrong answer!",
  "😞 Keep trying!",
  "🙄🤥 Not the one!",
  "😬🙆 Oops, wrong guess!",
  "👎🤒 That's not it!",
  "😣😮‍💨 Incorrect, try again!",
  "🤦🆘 Wrong answer!",
  "😟 Try again!",
  "🤷 Not that one!",
  "🧐 Think again!",
  "❤️‍🩹💊 Incorrect!",
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
  return shuffle(options);
};

const getRandomMessage = (messages) =>
  messages[Math.floor(Math.random() * messages.length)];

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
        setGameStatus(getRandomMessage(correctMessages));
        setTimeout(() => startNewRound(), 1500);
      } else {
        setGameStatus(getRandomMessage(wrongMessages));
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
