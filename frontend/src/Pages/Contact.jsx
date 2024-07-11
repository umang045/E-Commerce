import React, { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { FaHome } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import Container from "../Components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createEnq } from "../Features/contact/contactSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let loginSchema = yup.object({
  name: yup.string().required("name is Required!!"),
  email: yup
    .string()
    .nullable()
    .email("email should in valid!!")
    .required("Email is required"),
  mobile: yup.string().required("mobile Number is Required!!"),
  comment: yup.string().required("comment is Required!!"),
});

function Contact() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(
        createEnq({
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          comment: values.comment,
        })
      );
    },
  });

  return (
    <>
      <ToastContainer />
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />

      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.0078077512384!2d69.91211341629727!3d21.82453852404569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3957b926b042a64f%3A0xd5aa8e92770e8267!2sMaharana%20Pratap!5e1!3m2!1sen!2sin!4v1717993244708!5m2!1sen!2sin"
              // frameborder="1"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-3">Contact</h3>
                  <form
                    action=""
                    className="d-flex flex-column gap-15"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                      />
                      <div className="error">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="email"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      <div className="error">
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        placeholder="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                      />
                      <div className="error">
                        {formik.touched.mobile && formik.errors.mobile}
                      </div>
                    </div>
                    <div>
                      <textarea
                        name="comment"
                        id=""
                        cols="30"
                        rows="3"
                        className="w-100 form-control"
                        placeholder="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange("comment")}
                        onBlur={formik.handleBlur("comment")}
                      ></textarea>
                      <div className="error">
                        {formik.touched.comment && formik.errors.comment}
                      </div>
                    </div>
                    <button type="submit" className="button border border-0 ">
                      Submit
                    </button>
                  </form>
                </div>
                <div>
                  <h3 className="contact-title mb-4">Get in touch with us</h3>
                  <div>
                    <ul className="ps-0">
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <FaHome className="fs-5" />
                        <address className="mb-0">
                          satapar, Jamjodhpur , Jamnagar - 360 531 (Saurastra)
                        </address>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <IoMdCall className="fs-5" />
                        <a href="tel:+9099999999" className="mb-0">
                          9099887766
                        </a>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <IoIosMail className="fs-5" />
                        <a href="mailto:umang@mail.com" className="mb-0">
                          umangrathod@gmail.com
                        </a>
                      </li>
                      <li className="mb-3 d-flex align-items-center gap-15">
                        <IoInformationCircleOutline className="fs-5" />
                        <p className="mb-0">Monday to friday 9:15 to 3:00 pm</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Contact;
