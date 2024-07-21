import React, { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import { CustomInputs } from "../Components/CustomInputs";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getWishlist, loginUser } from "../Features/user/userSlice";
import { getAllBlogs } from "../Features/blogs/blogSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//validation schema
let loginSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("email should in valid!!")
    .required("Email is required"),
  password: yup.string().required("Password is Required!!"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state?.auth);
  // console.log(authState);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      setTimeout(() => {
        let msg = localStorage.getItem("token");

        if (msg == "Invalid Inputs!!") {
          toast.error(msg);
        } else {
          toast.success("Login successfully!!");
          navigate("/");
          dispatch(getAllBlogs());
          dispatch(getCart());
        }
      }, 500);
    },
  });

  return (
    <>
      <ToastContainer />
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center fs-12 mb-4">Login</h3>
              <form
                action=""
                className="d-flex flex-column gap-15 "
                onSubmit={formik.handleSubmit}
              >
                <CustomInputs
                  type="text"
                  name="email"
                  placeholder="email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInputs
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div className="d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button border-0">
                    Login
                  </button>
                  <Link className="button signup border-0" to="/signup">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
