import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropzone from "react-dropzone";
import "react-widgets/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  createBlogs,
  getABlog,
  updateABlog,
} from "../feature/allblogs/allblogSlice";
import { getBlogs } from "../feature/blogcat/blogcatSlice";
import { delImg, uploadImg } from "../feature/upload/uploadSlice";
import { useLocation, useNavigate } from "react-router-dom";



let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});



function Addblog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  const blogcatState = useSelector((state) => state?.blog?.blogs);
  const imageState = useSelector((state) => state?.upload?.images);
  // const blogState = useSelector((state) => state?.allblog?.allblogs);
  const newBlogState = useSelector((state) => state?.allblog);
  const { blogName, blogDesc, blogCategory, blogImages } = newBlogState;

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  const img = [];
  imageState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    if (getBlogId !== undefined) {
      // console.log(blogImages[0].url);
      dispatch(getABlog(getBlogId));
      formik.values.title = blogName;
      formik.values.category = blogCategory;
      formik.values.description = blogDesc;
      img.push({
        public_id: blogImages?.public_id,
        url: blogImages?.url,
      });
    } else {
      // dispatch(resetState());
    }
  }, [getBlogId]);

  console.log(img);

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        // dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          // dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            placeholder="Blogtitle"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <select
            name=""
            id=""
            className="form-control py-3 mb-3 "
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Blog Category</option>
            {blogcatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex mt-3  ">
            {imageState.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="position-absolute btn-close"
                    style={{ top: "5px", right: "5px" }}
                  ></button>
                  <img src={i.url} alt="upload img" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog{" "}
          </button>
        </form>
      </div>
    </>
  );
}

export default Addblog;
