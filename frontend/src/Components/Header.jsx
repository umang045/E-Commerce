import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../Features/product/productSlice";
import { toast, ToastContainer } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const [cartSum, setCartsum] = useState(0);
  const [paginate, setPaginate] = useState(true);
  
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.getCart);

  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum += Number(cartState[index]?.quantity) * cartState[index]?.price;
      setCartsum(sum);
    }
  }, [cartState,dispatch]);

  const productOpt = useMemo(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    return data;
  }, [productState]);

  return (
    <>
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

      <header className="header-upper py-3 px-4 d-flex align-items-center justify-content-center">
        <div className="container-xxl align-item-center">
          <div className="row align-item-center">
            <div className="col-2 mb-0 d-flex align-items-center">
              <h3>
                <Link className="text-white">E-Commerce</Link>
              </h3>
            </div>
            <div className="col-5 mb-0 d-flex align-items-center ">
              <div className="input-group ">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    console.log("onChange:", selected);
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  labelKey={"name"}
                  paginate={paginate}
                  placeholder="Search For Product Here..."
                  minLength={2}
                />
                <span className="input-group-text" id="basic-addon2">
                  <p className="m-auto coursor-pointer">Search</p>
                </span>
              </div>
            </div>
            <div className="col-5 mb-0 d-flex justify-content-around gap-30">
              <div className="header-upper-links d-flex align-items-center justify-content-around gap-30 mb-0 ">
                {/* <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white pl-3"
                  >
                    <img src="images/compare.svg" alt="Compare"></img>
                    <p className="mb-0">
                      Compare <br />
                      Products
                    </p>
                  </Link> */}

                <div className="me-2">
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/wishlist.svg" alt="Wishlist"></img>
                    <p className="mb-2">
                      Favourite <br />
                      Wishlist
                    </p>
                  </Link>
                </div>

                <div className="me-2">
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/cart.svg" alt="Cart"></img>
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0">$ {cartSum ? cartSum : 0}</p>
                    </div>
                  </Link>
                </div>
                <div className="me-2">
                  <Link
                    to={authState.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src="images/user.svg" alt="User"></img>
                    {localStorage.getItem("token") &&
                    localStorage.getItem("token") != "Invalid Inputs!!" ? (
                      <p className="mb-0">
                        Welcome {authState?.user?.updateUser?.firstname}
                      </p>
                    ) : (
                      <p className="mb-0">login</p>
                    )}
                  </Link>
                </div>
                <div>
                  {localStorage.getItem("token") &&
                  localStorage.getItem("token") != "Invalid Inputs!!" ? (
                    <button
                      className="button"
                      style={{
                        backgroundColor: "#febd69",
                        fontSize: "15px",
                        color: "black",
                      }}
                      type="button"
                      onClick={() => {
                        localStorage.clear();
                        setTimeout(() => {
                          window.location.reload();
                        }, 500);
                      }}
                    >
                      logout
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown bg-transperent">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 outline-0 d-flex align-items-center gap-15"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="DropDwn"></img>
                      Shop Category
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="#">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-link">
                  <div className="d-flex align-items-center gap-15 ">
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
    </>
  );
}

export default Header;
