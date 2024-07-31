import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import { useGetAllProducts } from "../Hooks/useGetAllProducts";

function SpecialProduct() {
  const Completionist = () => <span>Sale is over</span>;
  const { getAllProdState } = useGetAllProducts();
  return (
    <>
      {getAllProdState?.map((item, index) => {
        if (item?.tags === "special") {
          return (
            <Link
              key={index}
              to={`/product/${item?._id}`}
              className="col-6 mb-3 text-black   "
            >
              <div className="special-product-card">
                <div className="d-flex justify-content-between">
                  <div className="me-2 mt-4 ">
                    <img
                      src={item?.images[0].url}
                      alt={item?.title}
                      className="img-fluid"
                    ></img>
                  </div>
                  <div className="special-product-content">
                    <h5 className="brand">{item?.brand}</h5>
                    <h6 className="title">{item?.title}</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.totalratting}
                      edit={false}
                      activeColor="#ffd700"
                    ></ReactStars>
                    <p className="price">
                      <span className="red-p">${item?.price}</span>&nbsp;
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
                      <p>Products :{item?.quantity} </p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: item?.quantity }}
                          aria-valuenow={item?.sold}
                          aria-valuemin={0}
                          aria-valuemax={item?.quantity}
                        ></div>
                      </div>
                    </div>
                    <Link className="button mt-3" to={`/product/${item?._id}`}>
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          );
        }
      })}
    </>
  );
}

export default SpecialProduct;
