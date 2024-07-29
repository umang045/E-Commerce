import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
// import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../feature/auth/authSlice";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email Should be in valid form")
      .required("Email Reuired!!"),
    password: yup.string().required("Password Required!!"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      setTimeout(() => {
        let msg = JSON.parse(localStorage.getItem("user"));
        if (msg) {
          if (
            msg.message == "Invalid Inputs!!" ||
            msg.message == "You Are Not Authorize"
          ) {
            toast.error(msg.message);
          } else {
            toast.success("Login successfully!!");
            navigate("/admin");
          }
        }
      }, 500);
    },
  });

  const authState = useSelector((state) => state.auth?.user);

  // console.log(authState);

  useEffect(() => {
    if (authState?.message == "Invalid Inputs!!") {
      toast.error('"Invalid Inputs!!"');
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div
        className="py-5"
        style={{ background: "#ffd333", minHeight: "100vh" }}
      >
        <div className="my-5 w-25 bg-white rounded-3  mx-auto  p-4">
          <h3 className="text-center">Login</h3>
          <p className="text-center">Login to your account to continue</p>
          <div className="error text-center ">
            {/* {authState.message == "Rejected" ? "You Are Not Admin!!" : ""} */}
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChng={formik.handleChange("email")}
              val={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              placeholder="password"
              id="pass"
              name="password"
              onChng={formik.handleChange("password")}
              val={formik.values.password}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              className="border-0 mt-3 px-3 py-2 text-white w-100 fw-bold text-decoration-none text-center"
              style={{ background: "#ffd333" }}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
