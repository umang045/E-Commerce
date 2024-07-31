import React from "react";
import Container from "../Components/Container";

const HomePrdTotl = () => {
  return (
    <Container class1="home-wrapper-2 py-5">
      <div className="row">
        <div className="col-12">
          <div className="categories d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex gap-30 align-items-center border-end border-warning ">
              <div>
                <h6>Cameras</h6>
                <p>10 Items</p>
              </div>

              <img src="images/camera.jpg" alt="Categories"></img>
            </div>
            <div className="d-flex gap-30 align-items-center border-end border-warning ">
              <div>
                <h6>Smart Tv</h6>
                <p>7 Items</p>
              </div>
              <img src="images/tv.jpg" alt="Categories"></img>
            </div>
            <div className="d-flex gap-30 align-items-center border-end border-warning">
              <div>
                <h6>Smart Watches</h6>
                <p>20 Items</p>
              </div>
              <img
                src="images/watch.jpg"
                alt="Categories"
                className="img-fluid"
              ></img>
            </div>
            <div className="d-flex gap-30 align-items-center border-end border-warning">
              <div>
                <h6>Music & Gaming</h6>
                <p>10 Items</p>
              </div>
              <img src="images/headphone.jpg" alt="Categories"></img>
            </div>
          </div>
        </div>
      </div>{" "}
    </Container>
  );
};

export default HomePrdTotl;
