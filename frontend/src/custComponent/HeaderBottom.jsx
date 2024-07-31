import React from "react";
import { NavLink } from "react-router-dom";

const HeaderBottom = () => {
  return (
    <header className="header-bottom py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="menu-bottom d-flex align-items-center gap-30">
              <div className="menu-link d-flex align-items-center justify-content-center w-100">
                <div className="d-flex align-items-center gap-30 ">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/product">Our Store</NavLink>
                  <NavLink to="/my-orders">My Orders</NavLink>
                  <NavLink to="/blog">Blogs</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBottom;
