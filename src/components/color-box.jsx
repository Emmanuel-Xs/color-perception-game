/* eslint-disable react/prop-types */

const ColorBox = ({ color }) => {
  return (
    <div
      data-testid="colorBox"
      className="color-box"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default ColorBox;
