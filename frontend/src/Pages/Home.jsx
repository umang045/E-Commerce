import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../Components/BlogCard";
import ProductCard from "../Components/ProductCard";
import SpecialProduct from "../Components/SpecialProduct";
import Container from "../Components/Container";
import services from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../Features/blogs/blogSlice";
import { getAllProducts } from "../Features/product/productSlice";
import { useTimer } from "react-timer-hook";
import { ToastContainer } from "react-toastify";

function Home() {
  const dispatch = useDispatch();

  const blogState = useSelector((state) => state?.blog?.getAllBlogs);
  const productState = useSelector((state) => state?.product?.product);
  // console.log(productState);

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, []);

  return (
    <>
     <ToastContainer />
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

      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12">
            <div className="service d-flex align-items-center justify-content-between ">
              {services?.map((i, j) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div className="d-flex align-items-center gap-10" key={j}>
                    <img src={i.image} alt="service"></img>
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

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

      {/* <Container class1="feature-wrapper py-5 home-wrapper-2">
        {" "}
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container> */}

      {/* 
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative ">
              <img src="images/watch.jpg" alt="watch"></img>

              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series</h6>
              
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      {/* special Products */}
      <Container class1="special-warpper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
          <div className="row">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "special") {
                  return (
                    <SpecialProduct
                      key={index}
                      id={item?._id}
                      title={item?.title}
                      brand={item?.brand}
                      totalratting={item?.totalratting}
                      price={item?.price}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      src={item?.images[0]?.url}
                    />
                  );
                }
              })}
          </div>
        </div>
      </Container>

      {/* <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Brands</h3>
          </div>
          <div className="row">
            {productState &&
              productState.map((item, index) => {
                if (item.tags === "popular") {
                  return (
                    <ProductCard
                      key={index}
                      title={item?.title}
                      brand={item?.brand}
                      totalratting = {item?.totalratting}
                      price = {item?.price}
                      sold = {item?.sold}
                      quantity = {item?.quantity}
                    />
                  );
                }
              })}
          </div>
        </div>
      </Container>    */}

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

      {/* <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
      </Container> */}
    </>
  );
}

export default Home;
