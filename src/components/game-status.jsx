import { useEffect } from "react";

/* eslint-disable react/prop-types */
export default function GameStatus({ gameStatus, onClose, duration = 1500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const statusClass =
    gameStatus && gameStatus.type === "correct"
      ? "status-correct"
      : gameStatus && gameStatus.type === "wrong"
      ? "status-wrong"
      : "";

  return (
    <div className="status-wrapper">
      <p data-testid="gameStatus" className={`game-status ${statusClass}`}>
        {gameStatus && gameStatus.message}
      </p>
    </div>
  );
}
