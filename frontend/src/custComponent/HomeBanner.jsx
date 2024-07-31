import React from 'react'
import Container from "../Components/Container";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <Container class1="home-wrapper-1 py-4">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/main-banner-1.jpg"
                alt="main banner"
                className="img-fluid rounded-3"
              ></img>
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS</h4>
                <h5>Samsung S24</h5>
                <p>From $999.00 or $41.62/mo</p>
                <Link className="button">Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner  position-relative">
                <img
                  src="images/catbanner-01.jpg"
                  alt="main banner"
                  className="img-fluid rounded-3"
                ></img>
                <div className="small-banner-content position-absolute">
                  <h4>best saller</h4>
                  <h5>Galaxy Book</h5>
                  <p>
                    From $999.00 <br></br> or $41.62/mo
                  </p>
                </div>
              </div>
              <div className="small-banner  position-relative">
                <img
                  src="images/catbanner-02.jpg"
                  alt="main banner"
                  className="img-fluid rounded-3"
                ></img>
                <div className="small-banner-content position-absolute">
                  <h4>new Arrival</h4>
                  <h5>Trust Samsung</h5>
                  <p>
                    From $999.00 <br></br> or $41.62/mo
                  </p>
                </div>
              </div>
              <div className="small-banner  position-relative">
                <img
                  src="images/catbanner-03.jpg"
                  alt="main banner"
                  className="img-fluid rounded-3"
                ></img>
                <div className="small-banner-content position-absolute">
                  <h4>new Arrival</h4>
                  <h5>Galaxy Book</h5>
                  <p>
                    From $999.00 <br></br> or $41.62/mo
                  </p>
                </div>
              </div>
              <div className="small-banner  position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  alt="main banner"
                  className="img-fluid rounded-3"
                ></img>
                <div className="small-banner-content position-absolute">
                  <h4>new Arrival</h4>
                  <h5>Samsung S24</h5>
                  <p>
                    From $999.00 <br></br> or $41.62/mo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
  )
}

export default HomeBanner