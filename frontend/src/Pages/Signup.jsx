import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { CustomInputs } from "../Components/CustomInputs";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Features/user/userSlice";

let signUpSchema = yup.object({
  firstname: yup.string().required("firstname is required!!"),
  lastname: yup.string().required("lastname is required!!"),
  email: yup
    .string()
    .nullable()
    .email("email should in valid!!")
    .required("Email is required"),
  mobile: yup.string().required("mobile Number is Required!!"),
  password: yup.string().required("Password is Required!!"),
});

function Signup() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      // console.log(values);
    },
  });

  return (
    <>
      <Meta title={"Sign up"} />
      <BreadCrumb title="Sign up" />

      <Container class1="login-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center fs-12 mb-4">Create Account</h3>
              <form
                action=""
                className="d-flex flex-column gap-15 "
                onSubmit={formik.handleSubmit}
              >
                <CustomInputs
                  type="text"
                  name="firstname"
                  placeholder="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                <CustomInputs
                  type="text"
                  name="lastname"
                  placeholder="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

                <CustomInputs
                  type="email"
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
                  type="tel"
                  name="mobile"
                  placeholder="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>

                <CustomInputs
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div className="d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button border-0">
                    Sign Up
                  </button>
                  <Link className="button signup border-0" to="/login">
                    Login
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

export default Signup;
