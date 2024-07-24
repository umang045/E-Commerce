import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import pocket from "../images/pocket.jpg";
import {
  getCart,
  removeProductfromCart,
  updateProductfromCart,
} from "../Features/user/userSlice";
import { ToastContainer } from "react-toastify";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [cartSum, setCartsum] = useState(null);

  //check if user is login or not
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("please login first");
      navigate("/login");
    } else {
      dispatch(getCart());
    }
  }, [dispatch, navigate]);

  //update product quantity from cart
  useEffect(() => {
    dispatch(
      updateProductfromCart({
        _id: localStorage
          ?.getItem("id")
          ?.slice(1, localStorage.getItem("id").length - 1),
        cartItemId: productUpdateDetail?.cartItemId,
        quantity: productUpdateDetail?.quantity,
      })
    );
    setTimeout(() => {
      dispatch(getCart());
    }, 100);
  }, [dispatch, productUpdateDetail]);

  //fetch cart state
  const cartState = useSelector((state) => state?.auth?.getCart);

  //delete item from cart
  const deleteACart = (id) => {
    dispatch(removeProductfromCart(id));
    dispatch(getCart());
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index].quantity) * cartState[index].price;
      setCartsum(sum);
    }
  }, [cartState]);

  return (
    <>
      <ToastContainer></ToastContainer>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />

      {cartState?.length === 0 ? (
        <>
          <div className="text-center fs-4">No Data In Your Cart </div>
          <div className="d-flex justify-content-center" style={{height:"200px"}}><img src={pocket} alt="no cart img" srcset="" /></div>
        </>
      ) : (
        <Container class1="cart-wrapper home-wrapper-2">
          <div className="row">
            <div className="col-12">
              <div className="cart-header d-flex justify-content-between align-items-center py-3 ">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>

              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="cart-data d-flex justify-content-between align-items-center py-3 "
                    >
                      <div className="cart-col-1 gap-15 d-flex align-items-center ">
                        <div className="w-25 itmimg border border-1">
                          <img
                            src={item?.pid?.images[0]?.url}
                            className="img-fluid"
                            alt="not found"
                          />
                        </div>
                        <div className="w-75  ">
                          <p>Name : {item?.pid?.title}</p>
                          <p className="d-flex gap-15">
                            Color :
                            <ul className="colors ps-0 d-flex flex-wrap align-items-center ">
                              <li
                                style={{ backgroundColor: item?.color?.title }}
                              ></li>
                            </ul>
                          </p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">${item?.price}</h5>
                      </div>
                      <div className="cart-data col-3 d-flex  align-items-center gap-15">
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            name=""
                            id=""
                            min={1}
                            max={10}
                            value={item?.quantity}
                            onChange={(e) => {
                              setProductUpdateDetail({
                                cartItemId: item?._id,
                                quantity: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div>
                          <MdDelete
                            className="text-danger "
                            onClick={() => {
                              deleteACart(item?._id);
                            }}
                          />
                        </div>
                      </div>
                      <div className="cart-col-4">
                        ${item?.price * item?.quantity}
                      </div>
                    </div>
                  );
                })}

              <div className="col-12 py-2">
                <div className="d-flex justify-content-around align-items-center ">
                  <div>
                    <Link className="button" to="/product">
                      Continue To Shopping
                    </Link>
                  </div>
                  {(cartSum !== null || cartSum !== 0) && (
                    <div className="d-flex flex-column align-items-center">
                      <h4>Subtotal : ${cartSum}</h4>
                      <p>Shopping ... and more</p>
                      <Link className="button" to="/checkout">
                        CheckOut
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Cart;
