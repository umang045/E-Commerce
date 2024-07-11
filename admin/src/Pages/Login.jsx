import React, { useEffect } from "react";
import CustomInput from "../Components/CustomInput";
// import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../feature/auth/authSlice";

import { useNavigate } from "react-router-dom";

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
      alert(JSON.stringify(values, null, 2));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading]);

  useEffect(() => {
    // console.log(user.updateUser.refreshToken);
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess]);

  return (
    <>
      <div
        className="py-5"
        style={{ background: "#ffd333", minHeight: "100vh" }}
      >
        <div className="my-5 w-25 bg-white rounded-3  mx-auto  p-4">
          <h3 className="text-center">Login</h3>
          <p className="text-center">Login to your account to continue</p>
          <div className="error text-center ">
            {message.message == "Rejected" ? "You Are Not Admin!!" : ""}
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
