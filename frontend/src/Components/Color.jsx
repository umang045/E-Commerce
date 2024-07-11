import React from "react";

function Color(props) {
  const { data, onColorChange } = props; 
  
  const handleClick = (colorValue) => {
    onColorChange(colorValue); // Call the callback function with the selected color
  };
  // console.log(data);
  return (
    <>
      <ul className="colors ps-0 d-flex flex-wrap">
      {data &&
          data.map((item, index) => (
            <li
              key={index}
              style={{ backgroundColor: item?.title }}
              onClick={() => handleClick(item?._id)} // Pass color value on click
            >
            </li>
          ))}
      </ul>
    </>
  );
}

export default Color;
