import React from "react";

const HeaderTopStrip = () => {
  return (
    <header className="header-top-strip py-3 px-4">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <p className="mb-0 text-white">
              Free Shipping Over $100 & Trusted All Over In India
            </p>
          </div>
          <div className="col-6 text-white">
            <p className="text-end mb-0">
              Hotline :{" "}
              <a href="tel:+91 8899889988" className="text-white">
                +91 9099998877
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTopStrip;
