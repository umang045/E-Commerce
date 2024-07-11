import { React, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createPcategory,
  getAProductCategory,
  updateAProductCategory,
} from "../feature/pcategory/pcategorySlice";
import CustomInput from "../Components/CustomInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

function Addcat() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPCatId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state?.pcategory);
  const { categoryName } = newCategory;

  useEffect(() => {
    if (getPCatId != undefined) {
      dispatch(getAProductCategory(getPCatId));
      formik.values.title = categoryName;
    }
  }, [getPCatId, dispatch, categoryName]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        setTimeout(() => {
          navigate("/admin/list-category");
        }, 300);
      } else {
        dispatch(createPcategory(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/list-category");
        }, 300);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div>
        <h3 className="mb-4 title">Add Category</h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="category"
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
              Add Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addcat;
