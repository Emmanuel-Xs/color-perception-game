import { useColorGame } from "./hooks/use-color-game";
import "./App.css";
import ColorBox from "./components/color-box";
import ColorOptions from "./components/color-options";
import { ColorfulHeader } from "./components/colorful-header";
import GameStatus from "./components/game-status";

export default function App() {
  const {
    targetColor,
    colorOptions,
    score,
    gameStatus,
    handleColorGuess,
    resetGame,
    clearGameStatus,
  } = useColorGame();

  return (
    <main className="app">
      <ColorfulHeader text="Color Perception Game" />
      <p data-testid="gameInstructions" className="game-instructions">
        <span className="instruction-header">Guess the correct color!</span>
        <br />
        <span className="instruction-details">
          Choose the color that matches the box. Every correct guess increases
          your score. Use your perception skills to outsmart the game!
        </span>
      </p>
      <div className="score-new">
        <p data-testid="score" className="score">
          🏅 score: {score}
        </p>
        <button
          data-testid="newGameButton"
          className="new-game"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
      <ColorBox color={targetColor} />
      <ColorOptions colors={colorOptions} onGuess={handleColorGuess} />
      {gameStatus && (
        <GameStatus gameStatus={gameStatus} onClose={clearGameStatus} />
      )}
    </main>
  );
}
