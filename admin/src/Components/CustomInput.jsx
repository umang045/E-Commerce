import React from "react";

function CustomInput(props) {
    const {type , placeholder , i_id ,i_class , name ,onChng,val,onBlr} = props
  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control ${i_class}`}
          id={i_id}
          placeholder={placeholder}
          name={name}
          onChange={onChng}
          value={val}
          onBlur={onBlr}
        />
        <label htmlFor={placeholder}>{placeholder}</label>
      </div>
    </>
  );
}

export default CustomInput;
