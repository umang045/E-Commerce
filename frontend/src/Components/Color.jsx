import React from "react";

function Color(props) {
  const { data, onColorChange, color } = props;

  const handleClick = (colorValue) => {
    onColorChange(colorValue); // Call the callback function with the selected color
  };
  // console.log(color);
  return (
    <>
      <ul className="colors ps-0 d-flex flex-wrap">
        {data &&
          data.map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: item?.title,
                border:
                  color != null && color == item?._id ? "3px solid black" : "",
              }}
              onClick={() => handleClick(item?._id)} // Pass color value on click
            ></li>
          ))}
      </ul>
    </>
  );
}

export default Color;
