import React, { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../Features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(getUserOrders());
    }
  }, [dispatch, navigate]);


  const getUserOrderState = useSelector((state) => state?.auth?.getUserOrders);


  return (
    <>
      <BreadCrumb title="My Orders"></BreadCrumb>
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row m-auto ">
          <div className="col-12 ">
            <div className="row  ">
              <div className="col-3">
                <h5>Order Id</h5>
              </div>
              <div className="col-3">
                <h5>Total Amount</h5>
              </div>
              <div className="col-3">
                <h5>Payment Method</h5>
              </div>
              <div className="col-3">
                <h5>Status</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3 p-3 pb-3">
            {getUserOrderState &&
              getUserOrderState?.map((item, index) => {
                return (
                  <div
                    className="row mb-3 rounded rounded-4 fw-bold border border-1"
                    key={index}
                    style={{ backgroundColor: "#febd69" }}
                  >
                    <div className="col-3 fs-5">
                      <p>{item?._id}</p>
                    </div>
                    <div className="col-3 fs-5">
                      <p>{item?.totalPrice}</p>
                    </div>
                    <div className="col-3 fs-5">
                      <p>{item?.paymentMethod}</p>
                    </div>
                    <div className="col-3 fs-5">
                      <p>{item?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div
                        className="row  p-3"
                        style={{ backgroundColor: "#131921", color: "white" }}
                      >
                        <div className="col-3">
                          <h6>Product Name</h6>
                        </div>
                        <div className="col-3">
                          <h6>Quantity</h6>
                        </div>
                        <div className="col-3">
                          <h6>Price</h6>
                        </div>
                        <div className="col-3">
                          <h6>Color</h6>
                        </div>
                      </div>
                    </div>
                    {item?.orderItems?.map((i, index) => {
                      return (
                        <div className="col-12" key={index}>
                          <div
                            className="row   p-3"
                            style={{
                              backgroundColor: "#131921",
                              color: "white",
                            }}
                          >
                            <div className="col-3">
                              <p>{i?.product?.title}</p>
                            </div>
                            <div className="col-3">
                              <p>{i?.product?.quantity}</p>
                            </div>
                            <div className="col-3">
                              <p>{i?.product?.price}</p>
                            </div>
                            <div className="col-3">
                              <ul className="colors ps-0 d-flex flex-wrap align-items-center ">
                                <li
                                  style={{
                                    backgroundColor:
                                      item?.product?.color?.title,
                                  }}
                                ></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Order;
