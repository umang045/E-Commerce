import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../Features/product/productSlice";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { useGetAllProducts, useCart } from "../Hooks/useGetAllProducts";
import useAuth from "../Hooks/useAuth";
import CustomTypeahead from "../custComponent/CustomTypeahead";



const HeaderUpper = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //import auth , cart , and other value
  const authState = useAuth();
  const { cartState } = useCart();
  const { sum } = useCart();
  const { data } = useGetAllProducts();
  return (
    <header className="header-upper py-3 px-4 d-flex align-items-center justify-content-center">
      <div className="container-xxl align-item-center">
        <div className="row align-item-center">
          <div className="col-2 mb-0 d-flex align-items-center">
            <h3>
              <Link className="text-white">E-Commerce</Link>
            </h3>
          </div>
          <div className="col-5 mb-0 d-flex align-items-center ">
            <div className="input-group ">
              <CustomTypeahead
                id="pagination-example"
                onPaginate={() => console.log("Results paginated")}
                onChange={(selected) => {
                  dispatch(getAProduct(selected[0]?.prod));
                  if (selected[0]?.prod != undefined && selected.length > 0) {
                    navigate(`/product/${selected[0]?.prod}`);
                  } else {
                    navigate(`/product/`);
                  }
                }}
                options={data}
                labelKey={"name"}
                paginate={true}
                placeholder="Search For Product Here..."
                minLength={2}
              />
              <span className="input-group-text" id="basic-addon2">
                <p className="m-auto coursor-pointer">Search</p>
              </span>
            </div>
          </div>


          <div className="col-5 mb-0 d-flex justify-content-around gap-30">
            <div className="header-upper-links d-flex align-items-center justify-content-around gap-30 mb-0 ">
              <div className="me-2">
                <Link
                  to="/wishlist"
                  className="d-flex align-items-center gap-10 text-white"
                >
                  <FaRegHeart className="icons" />
                  <p className="mb-2">
                    Favourite <br />
                    Wishlist
                  </p>
                </Link>
              </div>


              <div className="me-2">
                <Link
                  to="/cart"
                  className="d-flex align-items-center gap-10 text-white"
                >
                  <TiShoppingCart className="icons" />
                  <div className="d-flex flex-column">
                    <span className="badge bg-white text-dark">
                      {cartState?.length ? cartState?.length : 0}
                    </span>
                    <p className="mb-0">$ {sum ? sum : 0}</p>
                  </div>
                </Link>
              </div>
              <div className="me-2">
                <Link
                  to={authState?.user === null ? "/login" : "/my-profile"}
                  className="d-flex align-items-center gap-10 text-white"
                >
                  <IoPerson className="icons" />
                  {localStorage.getItem("token") &&
                  localStorage.getItem("token") != "Invalid Inputs!!" ? (
                    <p className="mb-0">
                      Welcome {authState?.user?.updateUser?.firstname}
                    </p>
                  ) : (
                    <p className="mb-0">login</p>
                  )}
                </Link>
              </div>
              <div>
                {localStorage.getItem("token") &&
                localStorage.getItem("token") != "Invalid Inputs!!" ? (
                  <button
                    className="button"
                    style={{
                      backgroundColor: "#febd69",
                      fontSize: "15px",
                      color: "black",
                    }}
                    type="button"
                    onClick={() => {
                      localStorage.clear();
                      setTimeout(() => {
                        navigate("/");
                        window.location.reload();
                      }, 500);
                    }}
                  >
                    logout
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderUpper;
