import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../Components/Color";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Features/product/productSlice";
import { ToastContainer } from "react-toastify";

function OurStore() {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, settags] = useState([]);

  //filter State
  const [brand, setBrand] = useState([]);
  const [tag, setTag] = useState([]);
  const [category, setcategory] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  console.log(sort);

  const productState = useSelector((state) => state?.product?.product);
  console.log(productState);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand);
      category.push(element?.category);
      newtags.push(element?.tags);
    }
    setCategories(category);
    setBrands(newBrands);
    settags(newtags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort,tag,brand,category,minPrice,maxPrice]);

  const getProducts = () => {
    dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  };

  // alert(grid);
  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our store" />

      <ToastContainer />
      <Container class1="sotre-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <ul className="ps-0">
                {categories &&
                  [...new Set(categories)]?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setcategory(item);
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
              {/* <div>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div className="form-check d-flex align-items-center gap-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    ></input>
                    <label className="form-check-label">In Stocks(1)</label>
                  </div>
                  <div className="form-check d-flex align-items-center gap-10">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    ></input>
                    <label className="form-check-label">Out of Stocks(0)</label>
                  </div>
                </div>
              </div> */}
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
              {/* <div>
                <h5 className="sub-title">Color</h5>
                <div className="d-flex flex-wrap">
                  <Color />
                </div>
              </div> */}
              {/* <div>
                <h5 className="sub-title">Size</h5>
                <div className="form-check d-flex gap-10 align-items-center ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="size-s"
                  ></input>
                  <label className="form-check-label">S (1)</label>{" "}
                </div>
                <div className="form-check d-flex gap-10 align-items-center ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="size-M"
                  ></input>
                  <label className="form-check-label">M (1)</label>
                </div>
                <div className="form-check d-flex gap-10 align-items-center ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="size-XL"
                  ></input>
                  <label className="form-check-label">XL (1)</label>
                </div>
              </div> */}
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Products Tags</h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {tags &&
                  [...new Set(tags)]?.map((item, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          setTag(item);
                        }}
                        className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Products Brands</h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {brands &&
                  [...new Set(brands)]?.map((item, index) => {
                    return (
                      <span
                        key={index}
                        onClick={() => {
                          setBrand(item);
                        }}
                        className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      >
                        {item}
                      </span>
                    );
                  })}
              </div>
            </div>
            {/* <div className="filter-card mb-3">
              <h3 className="filter-title">Random Products</h3>
              <div>
                <div className="rondom-products mb-3 d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      alt="watch"
                      className="img-fluid"
                    ></img>
                  </div>
                  <div className="w-50">
                    <h5>kids headphone bulk 10 pack multi color </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    ></ReactStars>
                    <b>$300</b>
                  </div>
                </div>
              </div>
              <div>
                <div className="rondom-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      alt="watch"
                      className="img-fluid"
                    ></img>
                  </div>
                  <div className="w-50">
                    <h5>kids headphone bulk 10 pack multi color </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    ></ReactStars>
                    <b>$300</b>
                  </div>
                </div>
              </div>
            </div> */}
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
                    <option selected value="title">Alphabetically , A-Z</option>
                    <option value="-title">Alphabetically , Z-A</option>
                    <option value="price">Price, high-low</option>
                    <option value="-price">Price, low-high</option>
                    <option value="created">Date, old-new</option>
                    <option value="-created">Date, new-old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10 grid">
                  <p className="total-products mb-0">21 Products</p>
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
          </div>
        </div>
      </Container>
    </>
  );
}

export default OurStore;
