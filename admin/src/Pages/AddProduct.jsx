import React, { useEffect, useState } from "react";
import CustomInput from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { Select } from "antd";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getBrands } from "../feature/brand/brandSlice";
import { getPcategory } from "../feature/pcategory/pcategorySlice";
import { getColor } from "../feature/color/colorSlice";

import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../feature/upload/uploadSlice";
import { createProducts } from "../feature/product/productSlice";

toast.success("Product Added Successfully!!", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

let schema = yup.object().shape({
  title: yup.string().required("Title Reuired!!"),
  description: yup.string().required("description Required!!"),
  price: yup.number().required("price Required!!"),
  brand: yup.string().required("Brand is Required!!"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  category: yup.string().required("category is Required!!"),
  tags: yup.string().required("Tags is Required!!"),
  quantity: yup.number().required("Quantity Required!!"),
});


function AddProduct() {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();
 
  
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  const brandState = useSelector((state) => state?.brand?.brands);
  const CategoryState = useSelector((state) => state?.pcategory?.pcategorys);
  const colorState = useSelector((state) => state?.color?.colors);
  const imageState = useSelector((state) => state?.upload?.images);
  const newProduct = useSelector((state) => state?.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  console.log(createdProduct)
  useEffect(() => {
    if (isSuccess && createdProduct && isFormSubmitted) {
      toast.success("Product Added Successfully!!");
      setIsFormSubmitted(false); // Reset flag after displaying toast
    }
    if (isError && isFormSubmitted) {
      toast.error("Something Went Wrong!");
      setIsFormSubmitted(false); // Reset flag after displaying toast
    }
  }, [isSuccess, isError, isLoading, createdProduct, isFormSubmitted]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imageState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  // console.log(color);
  // console.log(colorState)
  // console.log(brandState)

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      quantity: "",
      color: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      console.log(values);
      // formik.resetForm();
      setColor(null);
      setTimeout(() => {
        // dispatch(resetState());
        // navigate('/admin/list-product')
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
    // console.log(color);
  };

  return (
    <>
   <ToastContainer />
      <div>
        <h3 className="mb-4">Add Product</h3>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="products title"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>

            <div className="mb-3">
              <ReactQuill
                theme="snow"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>

            <CustomInput
              type="number"
              placeholder="products price"
              name="price"
              onChng={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>

            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              id=""
              className="form-control py-3 mb-3 "
            >
              <option value="">Select Brand</option>

              {brandState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>

            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              id=""
              className="form-control py-3 mb-3 "
            >
              <option value="">Select Product Category</option>
              {CategoryState.map((i, j) => {
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

            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              value={formik.values.tags}
              id=""
              className="form-control py-3 mb-3 "
            >
              <option value="">Select Tags</option>
              <option value="featured">Featured</option>
              <option value="popular">popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>

            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder="Select colors"
              defaultValue={color}
              onChange={(i) => handleColors(i)}
              options={coloropt}
            />
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>

            <CustomInput
              type="number"
              name="quantity"
              onChng={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity}
              placeholder="products quantity"
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
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
              {imageState?.map((i, j) => {
                return (
                  <div className="position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="position-absolute btn-close"
                      style={{ top: "5px", right: "5px" }}
                    ></button>
                    <img
                      src={i.url}
                      alt="upload img"
                      width={200}
                      height={200}
                    />
                  </div>
                );
              })}
            </div>

            <div className="m-3">
              <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-5"
                // onSubmit={console.log(formik.values)}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;