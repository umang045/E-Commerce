import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeBlog } from "../Features/blogs/blogSlice";

function BlogCard(props) {
  const dispatch = useDispatch();
  // const [blogid, setBlogId] = useState(null);

  const data = props;
  // console.log(data.data);
  let location = useLocation();

  return (
    <>
      {data?.data?.map((item, index) => {
        return (
          <div
            className={`${
              location.pathname == "/blog"
                ? "col-5 mb-3 position-relative"
                : "col-3"
            } blghei`}
            key={index}
          >
            <div className="blog-card">
              <div
                className="w-25 fw-bold "
                style={{ float: "right", color: "red" }}
              >
                views : {item?.numViews}
              </div>
              <div className="card-img">
                <img
                  src={data?.data[index]?.images[0]?.url}
                  alt="blog"
                  className="img-fluid"
                ></img>
              </div>
              <div className="blog-content">
                <p className="date">
                  {/* <Moment date={item?.created_at} /> */}
                </p>
                {/* <h5 className="title">{item?.title}</h5> */}

                <p
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                ></p>
                {item?.description.length < 50 ? (
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></p>
                ) : (
                  <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: item?.description.substring(0, 100) + "...",
                    }}
                  ></p>
                )}
                <Link
                  style={{ bottom: "5px" }}
                  to={`/blog/${item?._id}`}
                  className="button"
                >
                  Read More
                </Link>
                <div
                  style={{ height: "30px", cursor: "pointer" }}
                  className="w-100 d-flex mt-2 gap-3 fs-4"
                >
                  <div
                    onClick={() => {
                      console.log(item?._id);
                      dispatch(
                        likeBlog({
                          blogId: item?._id,
                        })
                      );
                    }}
                  >
                    <AiOutlineLike />
                    <p className="fs-5">{item?.likes?.length}</p>
                  </div>
                  <div>
                    <AiOutlineDislike />
                    <p className="fs-5">{item?.dislikes?.length}</p>
                  </div>

                  {/* <AiFillDislike /> */}
                  {/* <AiFillLike /> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default BlogCard;
