import React, { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, getWishlist } from "../Features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      dispatch(getWishlist());
    }
  }, [dispatch, navigate]);


  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getWishlist());
    }, 300);
  };

  const wishlistState = useSelector(
    (state) => state?.auth?.getWishlist?.wishlist
  );


  return (
    <>
      <Meta title={"WishList"} />
      <BreadCrumb title="WishList" />

      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState && wishlistState.length === 0 && (
            <div className="text-center fs-4">No Data In Your Wishlist </div>
          )}
          {wishlistState &&
            wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-product-card position-relative">
                    <img
                      src="images/cross.svg"
                      alt="Cross"
                      className="position-absolute cross "
                      onClick={() => {
                        removeFromWishlist(item?._id);
                      }}
                    />
                    <div className="wishlist-card-image ">
                      <img
                        src={item?.images[0].url}
                        className="img-fluid w-100"
                        alt="watch"
                      />
                    </div>
                    <div className="py-3">
                      <h5 className="title">{item.title}</h5>
                      <h6 className="price mb-3">${item.price}</h6>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
}

export default Wishlist;
