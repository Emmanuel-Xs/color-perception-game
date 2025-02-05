import React from "react";

export function ColorfulHeader({ text }) {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"];
  const letters = text.split("");

  return (
    <h1 className="heading">
      {letters.map((letter, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>
          {letter}
        </span>
      ))}
    </h1>
  );
}
