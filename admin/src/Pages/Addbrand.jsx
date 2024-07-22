import React, { useCallback, useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createBrands,
  getaBrand,
  updateaBrand,
} from "../feature/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Brand name is  Reuired!!"),
});

function Addbrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split("/")[3];

  const newBrand = useSelector((state) => state?.brand);
  const { brandName } = newBrand;

  const updateFormikTitle = useCallback(() => {
    if (getBrandId != undefined) formik.values.title = brandName;
  }, [getBrandId, brandName]);

  // use effect for update an brand if id is there then its run
  useEffect(() => {
    if (getBrandId != undefined) {
      dispatch(getaBrand(getBrandId));
      updateFormikTitle();
    } else {
      console.log("hello");
    }
  }, [getBrandId, updateFormikTitle, brandName]);

  //formik for submit an data to slice which either update or add
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      //for update Brand
      if (getBrandId != undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateaBrand(data));
        setTimeout(() => {
          navigate("/admin/list-brand");
        }, 100);
      } else {
        //for Add Brand
        dispatch(createBrands(values));
        setTimeout(() => {
          navigate("/admin/list-brand");
        }, 100);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div>
        <h3 className="mb-4 title">
          {getBrandId !== undefined ? "Edit" : "Add"} Brand
        </h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Brand"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5"
            >
              {getBrandId !== undefined ? "Edit" : "Add"} Brand
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addbrand;
