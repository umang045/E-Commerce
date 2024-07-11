import React, { useEffect } from "react";

import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createColor, getAColor, updateAColor } from "../feature/color/colorSlice";


let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});


function Addcolor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state?.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;



  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      // dispatch(resetState());
    }
  }, [getColorId, dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        // dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          // dispatch(resetState());  
        }, 300);
      }
    },
  });

  return (
    <>
      <div>
        {getColorId !== undefined ? "Edit" : "Add"} Color
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="color"
              label="Enter Product Color"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
              id="color"
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5"
            >
              {getColorId !== undefined ? "Edit" : "Add"} Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addcolor;
