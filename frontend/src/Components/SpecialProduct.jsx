import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import Countdown from "react-countdown";

function SpecialProduct(props) {
  const Completionist = () => <span>Sale is over</span>;
  const { id, src, title, brand, price, totalratting, quantity, sold } = props;
  // console.log(props);

  return (
    <>
      <Link to={`/product/${id}`} className="col-6 mb-3 text-black   ">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div className="me-2 mt-4 ">
              <img src={src} alt={title} className="img-fluid"></img>
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={totalratting}
                edit={false}
                activeColor="#ffd700"
              ></ReactStars>
              <p className="price">
                <span className="red-p">${price}</span>&nbsp;
                <strike>$200</strike>
              </p>
              <div className="discount-till d-flex align-items-center  gap-10">
                <p className="mb-0">
                  <b>5 days</b>
                </p>
                <div className="bg-danger rounded-2 p-2 text-white font-weight-bold">
                  <Countdown date={Date.now() + 5000000}>
                    <Completionist />
                  </Countdown>
                </div>
              </div>
              <div className="prod-count mt-3">
                <p>Products :{quantity} </p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: quantity }}
                    aria-valuenow={sold}
                    aria-valuemin={0}
                    aria-valuemax={quantity}
                  ></div>
                </div>
              </div>
              <Link className="button mt-3" to={`/product/${id}`}>
                Explore
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SpecialProduct;
