import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../Components/Color";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllProducts,
  getProductAll,
} from "../Features/product/productSlice";
import { ToastContainer } from "react-toastify";

function OurStore() {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();

  //simple state
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, settags] = useState([]);

  //maintainstate
  const [nwbrands, setnwBrands] = useState([]);
  const [nwcategories, setnwCategories] = useState([]);
  const [nwtags, setnwTags] = useState([]);

  //filter State
  const [brand, setBrand] = useState(null);
  const [tag, setTag] = useState(null);
  const [category, setcategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(null);

  // console.log(page);
  console.log(brand, tag, category, minPrice, maxPrice, sort);
  const productState = useSelector((state) => state?.product?.product);
  const getAllProdState = useSelector((state) => state?.product?.getProductAll);

  // console.log(productState.length);
  // console.log(nwtags);

  useEffect(() => {
    dispatch(getProductAll());
  }, [getProductAll]);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    for (let index = 0; index < getAllProdState?.length; index++) {
      const element = getAllProdState[index];
      newBrands.push(element?.brand);
      category.push(element?.category);
      newtags.push(element?.tags);
    }
    setCategories(category);
    setBrands(newBrands);
    settags(newtags);
  }, [getAllProdState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice, page]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice, page })
    );
  };

  // alert(grid);
  return (
    <>
      <ToastContainer />
      <Meta title="Our Store" />
      <BreadCrumb title="Our store" />

      <Container class1="sotre-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <ul className="ps-0 d-flex flex-wrap gap-15">
                {categories &&
                  [...new Set(categories)]?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        style={{
                          borderBottom:
                            item === category ? "1px solid black" : "",
                        }}
                        onClick={() => {
                          if (category == null) {
                            setcategory(item);
                          } else if (category == item) {
                            setcategory(null);
                          } else {
                            setcategory(item);
                          }
                        }}
                      >
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>

              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="From"
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput2"
                      placeholder="To"
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingInput">To</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">Products Tags</h3>
              <div className="product-tags cursor d-flex flex-wrap align-items-center gap-10">
                {[...new Set(tags)]?.map((item, index) => {
                  return (
                    <span
                      style={{
                        border: item === tag ? "1px solid black" : "",
                      }}
                      key={index}
                      onClick={() => {
                        if (tag == null) {
                          setTag(item);
                        } else if (tag == item) {
                          setTag(null);
                        } else {
                          setTag(item);
                        }
                      }}
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="filter-card cursor mb-3">
              <h3 className="filter-title">Products Brands</h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {brands &&
                  [...new Set(brands)]?.map((item, index) => {
                    return (
                      <span
                        key={index}
                        style={{
                          border: item === brand ? "1px solid black" : "",
                        }}
                        onClick={() => {
                          if (brand == null) {
                            setBrand(item);
                          } else if (brand == item) {
                            setBrand(null);
                          } else {
                            setBrand(item);
                          }
                        }}
                        className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="col-9">
            {/* code for navbar of produvts */}
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0">Sort By:</p>
                  <select
                    name=""
                    className="form-control form-select"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option selected value="title">
                      Alphabetically , A-Z
                    </option>
                    <option value="-title">Alphabetically , Z-A</option>
                    <option value="-price">Price, high-low</option>
                    <option value="price">Price, low-high</option>
                    <option value="created">Date, old-new</option>
                    <option value="-created">Date, new-old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10 grid">
                  <p className="total-products mb-0">
                    {getAllProdState?.length} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center">
                    <img
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(3)}
                    ></img>
                    <img
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(4)}
                    ></img>
                    <img
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(6)}
                    ></img>
                    <img
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(12)}
                    ></img>
                  </div>
                </div>
              </div>
            </div>

            {/* code for products */}
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={productState ? productState : []}
                  grid={grid}
                />
              </div>
            </div>

            {/* code for pagination */}
            <div className=" w-100  d-flex align-items-center justify-content-center">
              {page !== null && page != 1 ? (
                <button
                  className="btn btn-primary me-4"
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  prev
                </button>
              ) : (
                ""
              )}

              {productState?.length < 6 ? (
                ""
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    page === null ? setPage(2) : setPage(page + 1);
                  }}
                >
                  next
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default OurStore;
