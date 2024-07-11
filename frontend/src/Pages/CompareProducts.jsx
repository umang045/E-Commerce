import React, { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import Color from "../Components/Color";
import Container from "../Components/Container";
function CompareProducts() {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />

      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src="images/cross.svg"
                alt="Cross"
                className="position-absolute cross"
              />
              <div className="product-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">Samsung Samrt Watch altra max</h5>
                <h6 className="price mb-3">$100</h6>
                <div>
                  <div className="product-detail">
                    <h6>Brand :</h6>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h6>Type :</h6>
                    <p>Watch</p>
                  </div>
                  <div className="product-detail">
                    <h6>Availability :</h6>
                    <p>In Stocks</p>
                  </div>
                  <div className="product-detail d-flex align-items-center">
                    <h6>Color :</h6>
                    <Color className="mb-0" />
                  </div>
                  <div className="product-detail">
                    <h6>Size :</h6>
                    <div className="d-flex gap-10">
                      <p>S</p>
                      <p>M</p>
                      <p>XL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src="images/cross.svg"
                alt="Cross"
                className="position-absolute cross"
              />
              <div className="product-card-image">
                <img src="images/watch.jpg" alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">Samsung Samrt Watch altra max</h5>
                <h6 className="price mb-3">$100</h6>
                <div>
                  <div className="product-detail">
                    <h6>Brand :</h6>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h6>Type :</h6>
                    <p>Watch</p>
                  </div>
                  <div className="product-detail">
                    <h6>Availability :</h6>
                    <p>In Stocks</p>
                  </div>
                  <div className="product-detail d-flex align-items-center">
                    <h6>Color :</h6>
                    <Color className="mb-0" />
                  </div>
                  <div className="product-detail">
                    <h6>Size :</h6>
                    <div className="d-flex gap-10">
                      <p>S</p>
                      <p>M</p>
                      <p>XL</p>
                    </div>
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

export default CompareProducts;
