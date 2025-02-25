import React from "react";
import Marquee from "react-fast-marquee";
import Container from "../Components/Container";
const HomeMrq = () => {
  return (
    <Container class1="marque-wrapper py-5">
      <div className="row">
        <div className="col-12">
          <div className="marquee-inner-wrapper card-wrapper">
            <Marquee className="d-flex">
              <div className="mx-4 w-25">
                <img src="images/brand-01.png" alt="Brand"></img>
              </div>
              <div className="mx-4 w-25">
                <img src="images/brand-02.png" alt="Brand"></img>
              </div>
              <div className="mx-4 w-25">
                <img src="images/brand-03.png" alt="Brand"></img>
              </div>
              <div className="mx-4 w-25">
                <img src="images/brand-04.png" alt="Brand"></img>
              </div>
              <div className="mx-4 w-25">
                <img src="images/brand-05.png" alt="Brand"></img>
              </div>
              <div className="mx-4 w-25">
                <img src="images/brand-06.png" alt="Brand"></img>
              </div>
              <div className="mx-4 w-25">
                <img src="images/brand-07.png" alt="Brand"></img>
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomeMrq;
