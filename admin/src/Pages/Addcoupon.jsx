import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

import {
  createCoupon,
  getACoupon,
  updateACoupon,
} from "../feature/coupon/couponSlice";



let schema = yup.object().shape({
  name: yup.string().required("Coupon name is  Reuired!!"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});



function AddCoupon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state?.coupon);
  const { couponName, couponDiscount, couponExpiry } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));

      formik.values.name = couponName;
      formik.values.discount = couponDiscount;
    } else {
      // dispatch(resetState());
    }
  }, [getCouponId, dispatch, couponName]);

  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, month, day].join("-");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        console.log(values);
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        // dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          // dispatch(resetState);
        }, 300);
      }
    },
  });
  return (
    <>
      <ToastContainer />
      <div>
        <h3 className="mb-4 title">
          {getCouponId !== undefined ? "Edit" : "Add"} Coupon
        </h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Coupon"
              name="name"
              onChng={formik.handleChange("name")}
              onBlr={formik.handleBlur("name")}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>

            <CustomInput
              type="date"
              name="expiry"
              onChng={formik.handleChange("expiry")}
              onBlr={formik.handleBlur("expiry")}
              val={formik.values.expiry}
              label="Enter Expiry Data"
              id="date"
            />
            <div className="error">
              {formik.touched.expiry && formik.errors.expiry}
            </div>

            <CustomInput
              type="number"
              name="discount"
              onChng={formik.handleChange("discount")}
              onBlr={formik.handleBlur("discount")}
              val={formik.values.discount}
              placeholder="Enter Discount"
              id="discount"
            />
            <div className="error">
              {formik.touched.discount && formik.errors.discount}
            </div>

            <button
              type="submit"
              className="btn btn-success border-0 rounded-3 my-5"
            >
              {getCouponId !== undefined ? "Edit" : "Add"} Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCoupon;
