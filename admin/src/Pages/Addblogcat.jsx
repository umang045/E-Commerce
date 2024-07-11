import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createNewblogCat,
  getABlogCat,
  updateABlogCat,
} from "../feature/blogcat/blogcatSlice";
import { resetState } from "../feature/pcategory/pcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Blog Category Name is Required"),
});

function Addblogcat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];

  const newBlogCategory = useSelector((state) => state?.blog);
  const { blogCatName } = newBlogCategory;

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
        formik.resetForm();
        setTimeout(() => {
          console.log("hello");
          dispatch(resetState());
        }, 300);
      }
    },
  });
  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
      formik.values.title = blogCatName;
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId, dispatch, blogCatName]);

  return (
    <>
      <div>
        <ToastContainer />
        <div>
          <h3 className="mb-4 title">
            {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </h3>
          <div>
            <form action="" onSubmit={formik.handleSubmit}>
              <CustomInput
                type="text"
                placeholder="Blog category"
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
                {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addblogcat;
