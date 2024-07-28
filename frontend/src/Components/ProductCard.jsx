import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";

import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import compare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import cart from "../images/add-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../Features/user/userSlice";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function ProductCard(props) {
  const grid = props;
  const data = grid.data;
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addprodToWishlist = (id) => {
    if (!localStorage.getItem("token")) {
      toast.error("You Need To Login First");
      navigate("/login");
      return;
    }
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <Link
            key={index}
            className={`${
              location.pathname == "/product" ? `gr-${grid.grid}` : "col-3"
            }`}
          >
            <div className="product-card position-relative border-0 bg-white">
              {item?.availability ? (
                <></>
              ) : (
                <div className="fw-bold" style={{ color: "red" }}>
                  Comming Soon...
                </div>
              )}
              <div className="wishlist-icon position-absolute">
                <button
                  className="border border-0 bg-transparent"
                  onClick={() => {
                    addprodToWishlist(item._id);
                  }}
                >
                  <FaRegHeart />
                </button>
              </div>

              <Link to={"/product/" + item?._id}>
                <img
                  src={item.images[0].url}
                  alt="product"
                  className="img-fluid"
                ></img>
              </Link>

              <div className="product-details d-flex flex-column align-items-center jusify-content-center">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">{item?.title}</h5>
                <ReactStars
                  classNames="d-flex justify-content-center "
                  count={5}
                  size={24}
                  value={item?.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                ></ReactStars>

                <p
                  className={`description ${
                    grid.grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">${item?.price}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ProductCard;
