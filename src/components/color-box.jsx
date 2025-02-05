/* eslint-disable react/prop-types */

const ColorBox = ({ color }) => {
  return (
    <div
      data-testid="colorBox"
      className="color-box"
      style={{ backgroundColor: color }}
    >
      <p className="color-box-text">?</p>
    </div>
  );
};

export default ColorBox;
