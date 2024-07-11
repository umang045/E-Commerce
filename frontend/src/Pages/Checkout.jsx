import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "./BreadCrumb";
import { Link } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../Components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let checkoutSchema = yup.object({
  firstname: yup.string().required("firstname is Required!!"),
  lastname: yup.string().required("lastname is Required!!"),
  address: yup.string().required("address is Required!!"),
  state: yup.string().required("state is Required!!"),
  city: yup.string().required("city is Required!!"),
  country: yup.string().required("country is Required!!"),
  paymentMethod: yup.string().required("paymentMethod is Required!!"),
  zipcode: yup.number().required("pincode is Required!!"),
});

function Checkout() {
  const [cartSum, setCartsum] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.getCart);
  const id = localStorage.getItem("id");
  console.log(id);
  console.log(id.slice(1, id.length - 1));
  console.log(cartState);

  useEffect(() => {
    if (cartState) {
      const formatedItem = cartState?.map((item) => ({
        product: item?.pid?._id,
        color: item?.color?._id,
        qantity: item?.quantity,
      }));
      setCartItems(formatedItem);
      let sum = 0;
      for (let index = 0; index < cartState?.length; index++) {
        sum += Number(cartState[index].quantity) * cartState[index].price;
        setCartsum(sum + 5);
      }
    }
  }, [cartState]);
  console.log(cartItems);
  console.log(cartSum);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      country: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      paymentMethod: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: (values) => {
      const checkOutData = {
        user: id.slice(1, id.length - 1),
        firstName: values.firstname,
        lastName: values.lastname,
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        paymentMethod: values.paymentMethod,
        pincode: values.zipcode,
        orderItems: cartItems,
        totalPrice: cartSum,
      };
      console.log(checkOutData);

      axios
        .post(
          "http://localhost:4545/api/user/cart/create-order",
          checkOutData,
          config
        )
        .then((response) => {
          if (response) {
            toast.success("Your Order Placed SuccesFully!!");
          }
          console.log("Checkout successful:", response.data);
        })
        .catch((error) => {
          console.error("Checkout error:", error);
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <Container class1="checkout-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">E-Commerce</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">>" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark" to="/cart" href="#">
                      Cart
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Information
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Shipping</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title">Conatct Information</h4>
              <p className="user-details">UmangRathod@mail.com</p>
              <h4 className="mb-3 ">🏠Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex flex-wrap  gap-15 justify-content-around "
              >
                <div className="w-100">
                  <select
                    name="country"
                    id=""
                    value={formik.values.country}
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleChange("country")}
                    className="form-control form-select "
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>

                <div className="flex-flex-grow-1 ">
                  <input
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleChange("firstname")}
                    placeholder="First Name"
                    className="form-control"
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="flex-flex-grow-1 ">
                  <input
                    type="text"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleChange("lastname")}
                    placeholder="Last Name"
                    className="form-control"
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleChange("address")}
                    placeholder="Address"
                    className="form-control"
                  />
                  <div className="error">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment , suite ,etc"
                    className="form-control"
                  />
                </div>
                <div className="flex-flex-grow-1">
                  <input
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleChange("city")}
                    placeholder="city"
                    className="form-control"
                  />
                  <div className="error">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-flex-grow-1 ">
                  <select
                    name="state"
                    id=""
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleChange("state")}
                    className="form-control form-select "
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Gujrat">Gujrat</option>
                  </select>
                  <div className="error">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-flex-grow-1 ">
                  <input
                    type="text"
                    name="zipcode"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange("zipcode")}
                    onBlur={formik.handleChange("zipcode")}
                    placeholder="zip code"
                    className="form-control"
                  />
                  <div className="error">
                    {formik.touched.zipcode && formik.errors.zipcode}
                  </div>
                </div>

                <div className="w-100">
                  <select
                    name="paymentMethod"
                    id=""
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange("paymentMethod")}
                    onBlur={formik.handleChange("paymentMethod")}
                    className="form-control form-select "
                  >
                    <option value="" selected disabled>
                      Select paymentMethod
                    </option>
                    <option value="CashOnDelivery">CashOnDelivery</option>
                    <option value="OnlineUpi">OnlineUpi</option>
                  </select>
                  <div className="error">
                    {formik.touched.paymentMethod &&
                      formik.errors.paymentMethod}
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between  align-items-center ">
                    <Link to="/cart" className="text-dark">
                      ⬅️ Return To Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue To Shipping
                    </Link>
                    <button type="submit" className="button border border-0">
                      Buy Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      className="d-flex gap-10 align-items-center justify-content-between gap-30"
                      key={index}
                    >
                      <div className="w-75 d-flex gap-30 align-items-center ">
                        <div className="position-relative w-25">
                          <span
                            className="badge bg-secondary  text-white  rounded-circle  p-2 position-absolute"
                            style={{ top: "-12px", right: "-12px" }}
                          >
                            {item?.quantity}
                          </span>
                          <div style={{ width: "100px" }}>
                            <img
                              src={item?.pid?.images[0]?.url}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </div>
                        <div>
                          <h5 className="title">{item?.pid?.title}</h5>
                          <p>{item?.pid?.brand}</p>
                        </div>
                      </div>
                      <div className="flex-flex-grow-1 ">
                        <h5>${item?.pid?.price * item?.quantity}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between  align-items-center ">
                <p>Subtotal</p>
                <p>$ {cartSum ? cartSum : "0"}</p>
              </div>
              <div className="d-flex justify-content-between  align-items-center ">
                <p className="mb-0">Shipping</p>
                <p className="mb-0">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between  align-items-center border-bottom py-4 ">
              <h4>Total</h4>
              <h5>$ {cartSum ? cartSum + 5 : "0"}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Checkout;
