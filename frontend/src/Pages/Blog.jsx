import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import BlogCard from "../Components/BlogCard";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../Features/blogs/blogSlice";

function Blog() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const blogState = useSelector((state) => state?.blog?.getAllBlogs);
  console.log(blogState);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="Blogs" />

      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">All Categories</h3>
              <ul className="ps-0">
                {blogState &&
                  blogState?.map((item,index) => {
                    return <li key={index}>{item?.category}</li>;
                  })}
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <BlogCard data={blogState} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Blog;
