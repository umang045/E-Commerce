import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const CustomTypeahead = ({
  id,
  onChange,
  options,
  labelKey,
  paginate,
  placeholder,
  minLength,
  ...props
}) => {
  return (
    <Typeahead
      id={id}
      onChange={onChange}
      options={options}
      labelKey={labelKey}
      paginate={paginate}
      placeholder={placeholder}
      minLength={minLength}
      {...props}
    />
  );
};

export default CustomTypeahead;
