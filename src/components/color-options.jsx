/* eslint-disable react/prop-types */

const ColorOptions = ({ colors, onGuess }) => {
  return (
    <div className="color-options">
      {colors.map((color, index) => (
        <button
          key={index}
          data-testid="colorOption"
          className="color-option"
          style={{ backgroundColor: color }}
          onClick={() => onGuess(color)}
        ></button>
      ))}
    </div>
  );
};

export default ColorOptions;
