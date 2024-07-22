import React, { useEffect } from "react";
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
      {/* {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname == "/product" ? `gr-${grid.grid}` : "col-3"
            }`}
          >
            <div
              className="product-card position-relative border-0 bg-white"
            >
              <div className="wishlist-icon position-absolute">
                <button
                  className="border border-0 bg-transparent"
                  onClick={(e) => {
                    addprodToWishlist(item._id);
                  }}
                >
                  <img src={wish} alt="wishlist"></img>
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
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={compare} alt="compare"></img>
                  </button>
                  <Link
                    to={"/product/" + item?._id}
                    className="border-0 bg-transparent"
                  >
                    <img src={view} alt="view"></img>
                  </Link>
                  <button className="border-0 bg-transparent">
                    <img src={cart} alt="addcart"></img>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="product-grid">
            <div class="product-image">
              <a href="#" class="image">
                <img class="pic-1" src={watch} />
                <img class="pic-2" src={watch} />
              </a>
              <span class="product-hot-label">hot</span>
              <ul class="product-links">
                <li>
                  <a href="#" data-tip="Add to Wishlist">
                    <i class="far fa-heart"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-tip="Compare">
                    <i class="fa fa-random"></i>
                  </a>
                </li>
                <li>
                  <a href="#" data-tip="Quick View">
                    <i class="fa fa-search"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="product-content">
              <a class="add-to-cart" href="#">
                <i class="fas fa-plus"></i>Add to cart
              </a>
              <h3 class="title">
                <a href="#">Men's Jacket</a>
              </h3>
              <ul class="rating">
                <li class="fas fa-star"></li>
                <li class="fas fa-star"></li>
                <li class="fas fa-star"></li>
                <li class="far fa-star"></li>
                <li class="far fa-star"></li>
              </ul>
              <div class="price">$75.99</div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default ProductCard;
