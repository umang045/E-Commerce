import React, { useEffect } from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import blog1 from "../images/blog-1.jpg";
import { getABlog } from "../Features/blogs/blogSlice";

function SingleBlog() {

  const  singleblogState = useSelector((state)=>state.blog.getABlog)
  let location = useLocation()
 const BlogId = location.pathname.split('/')[2]

 const dispatch = useDispatch();

 useEffect(()=>{
  dispatch(getABlog(BlogId))
 },[])

 console.log(singleblogState);

  return (
    
    <>
      <Meta title={"Single Blog"} />
      <BreadCrumb title="Single Blog" />

      <Container className="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blog">⬅️Go Back To Blog</Link>
              <h3 className="title">{singleblogState && singleblogState.title}</h3>
              <img
                src={singleblogState && singleblogState.images[0].url}
                alt="blog"
                className="img-fluid w-100 h-75 "
              ></img>
              <p  dangerouslySetInnerHTML={{ __html: singleblogState?.description }}>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SingleBlog;
