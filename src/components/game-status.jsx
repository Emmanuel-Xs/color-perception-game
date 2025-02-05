/* eslint-disable react/prop-types */
import { useEffect } from "react";

export default function GameStatus({ gameStatus, onClose, duration = 1500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const statusClass = gameStatus.includes("Correct")
    ? "status-correct"
    : gameStatus.includes("Wrong")
    ? "status-wrong"
    : "";

  return (
    <div className="status-wrapper">
      <p data-testid="gameStatus" className={`game-status ${statusClass}`}>
        {gameStatus}
      </p>
    </div>
  );
}
