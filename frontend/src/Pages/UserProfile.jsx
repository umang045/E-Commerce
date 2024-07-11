import React from "react";
import BreadCrumb from "./BreadCrumb";
import Container from "../Components/Container";
import { useFormik } from "formik";
import * as yup from "yup";

let profileSchema = yup.object({
  firstname: yup.string().required("firstname is Required!!"),
  lastname: yup.string().required("lastname is Required!!"),
  email: yup.string().required("email is Required!!"),
  mobile: yup.string().required("mobile is Required!!"),
});

const UserProfile = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      //   setTimeout(() => {
      //     console.log(authState?.isSuccess);
      //     if (authState?.isSuccess) {
      //       navigate("/");
      //     }
      //   }, 300);
      // console.log(values);
    },
  });
  return (
    <>
      <BreadCrumb title="My Profile"></BreadCrumb>
      <Container class1="cart-wrapper home-wrapper-2 ">
        <div className="row">
          <div className="col-12">
            <form className="p-3 pb-3 ">
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="firstname"
                  className="form-control"
                  id="firstname"
                  placeholder="Enter firstname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="lastname"
                  className="form-control"
                  id="lastname"
                  placeholder="Enter lastname"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="mobile"
                  className="form-control"
                  id="mobile"
                  placeholder="Enter mobile"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserProfile;
