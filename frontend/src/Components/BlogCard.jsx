import React from "react";
import { Link, useLocation } from "react-router-dom";


function BlogCard(props) {
  const data = props;
  // console.log(data.data);
  let location = useLocation();
  // console.log(location)
  return (
    <>
      {data?.data?.map((item, index) => {
        return (
          <div
            className={`${
              location.pathname == "/blog" ? "col-5 mb-3" : "col-3"
            } `}
            key={index}
          >
            <div className="blog-card">
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
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <Link to={`/blog/${item?._id}`} className="button">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default BlogCard;
