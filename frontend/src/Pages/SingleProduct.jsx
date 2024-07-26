import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import ProductCard from "../Components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from "react-image-magnify";
import Color from "../Components/Color";
import { FaCodeCompare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, rateProduct } from "../Features/product/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart, getCart } from "../Features/user/userSlice";
import { BiArrowBack } from "react-icons/bi";

function SingleProduct() {
  const [color, setcolor] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProdId = location.pathname.split("/")[2];

  const addRattingToProducts = () => {
    if (!localStorage.getItem("token")) {
      alert("you need to login first");
      navigate("/login");
      return;
    } else if (star === null) {
      toast.error("Please Add Start For Ratting!");
      return false;
    }
    if (comment === null) {
      toast.error("Please Write A Review !!");
      return false;
    } else {
      dispatch(
        rateProduct({ star: star, comment: comment, prodId: getProdId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProdId));
      }, 100);
    }
    return false;
  };

  const handleColorChange = (newColor) => {
    if (color == null) {
      setcolor(newColor);
    } else if (color == newColor) {
      setcolor(null);
    } else {
      setcolor(newColor);
    }
  };
  // console.log(color)

  useEffect(() => {
    dispatch(getAProduct(getProdId));
    dispatch(getCart());
  }, [dispatch, getProdId]);

  const getAProductState = useSelector((state) => state?.product?.getAProduct);
  const getCartState = useSelector((state) => state?.auth?.getCart);
  const url = getAProductState?.images[0].url;

  // console.log(getAProductState);

  useEffect(() => {
    for (let index = 0; index < getCartState?.length; index++) {
      if (getProdId === getCartState[index]?.pid?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const uploadCart = () => {
    if (!localStorage.getItem("token")) {
      alert("you need to login first");
      navigate("/login");
      return;
    }
    if (color === null) {
      toast.error("Please Select One Color");
      return false;
    } else {
      dispatch(
        addToCart({
          pid: getAProductState?._id,
          quantity,
          color,
          price: getAProductState?.price,
        })
      );
      setAlreadyAdded(true);
    }
  };

  const props = {
    width: 400,
    height: 200,
    zoomWidth: 300,
    img: `${url}`,
  };
  const [orderdProducts, setOrderedProducts] = useState(true);

  return (
    <>
      <Meta title={"Single Product"} />
      <BreadCrumb title="Single Products" />
      <ToastContainer />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <button className="bg-transpatent btn btn-outline-primary border-0 fs-6 m-3 d-flex align-items-center gap-1">
          <BiArrowBack className="fs-5" /> Go Back
        </button>
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: `${url}`,
                      // height : 500
                    },
                    largeImage: {
                      src: `${url}`,
                      width: 1200,
                      height: 1800,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3>{getAProductState && getAProductState.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  $ {getAProductState && getAProductState.price}
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value="3"
                    edit={false}
                    activeColor="#ffd700"
                  ></ReactStars>
                  <p className="mb-0">2 Reviews</p>
                </div>
              </div>
              <div className="border-bottom py-3 ">
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">
                    {getAProductState && getAProductState.brand}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">
                    {getAProductState && getAProductState.category}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">
                    {getAProductState && getAProductState.tags}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  <h3 className="product-heading">Availability :</h3>
                  <p className="product-data">Instocks</p>
                </div>

                {alreadyAdded === false && (
                  <>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading ">Color :</h3>
                      <Color
                        color={color}
                        onColorChange={handleColorChange}
                        data={getAProductState?.color || []}
                      />
                    </div>
                  </>
                )}
                <div className="d-flex gap-10 align-items-center  mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading ">Quantity :</h3>
                      <div className="quantity">
                        <input
                          type="number"
                          name=""
                          id=""
                          defaultValue={1}
                          min={1}
                          max={10}
                          style={{ width: "70px" }}
                          className="form-control"
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex align-items-center gap-30 mt-2 mb-3  justify-content-center ">
                  <button
                    type="submit"
                    className="button border-0"
                    onClick={() =>
                      alreadyAdded ? navigate("/cart") : uploadCart()
                    }
                  >
                    {alreadyAdded ? "Go To Cart" : "Add To Cart"}
                  </button>
                </div>
                <div className="d-flex align-items-center  mt-2 mb-3 gap-15">
                  <FaRegHeart />
                  <a href="">Add To Wishlist</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: getAProductState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </Container>

      <Container id="review" class1="review-wrapper py-2 home-wrapper-2 mb-4">
        <div className="row">
          <div className="col-12">
            <h3>Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customers Reviews</h4>
                  <div className="d-flex align-items-center  gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value="3"
                      edit={false}
                      activeColor="#ffd700"
                    ></ReactStars>
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderdProducts && (
                  <div>
                    <a
                      className="text-dark  text-decoration-underline "
                      href="http://"
                    >
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form">
                <h4 className="mt-3">Write A Review</h4>

                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value="0"
                    // edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  ></ReactStars>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    className="w-100 form-control"
                    placeholder="Write a Review"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={addRattingToProducts}
                  className="button  border-0 mt-3 m-auto"
                >
                  Submit
                </button>
              </div>
              <div className="reviews">
                <h3 className="mt-3">Reviews Of Customers</h3>
                {getAProductState &&
                  getAProductState?.ratting?.map((item, index) => {
                    return (
                      <div className="review" key={index}>
                        <div className="d-flex gap-15 align-items-center">
                          <h6 className="mb-0">😎Umang L Rathod</h6>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          ></ReactStars>
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* <Container class1="feature-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <div className="row">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </Container> */}
    </>
  );
}

export default SingleProduct;
