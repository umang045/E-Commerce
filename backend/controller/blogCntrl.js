const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

//create blog
const createblog = asyncHandler(async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

//delete blog
const deleteblog = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

//update blog
const updateblog = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

//get one blog
const getablog = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const getBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(getBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//get All blog
const getAllblog = asyncHandler(async (req, res, next) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

//like blog
const likeblog = asyncHandler(async (req, res, next) => {
  try {
    const { blogId } = req.body;
    const { id } = req.user;
    const blog = await Blog.findById(blogId);
    const user = await User.findById(id);

    const isLiked = blog?.isLiked;
    const isDisliked = blog?.isDisliked;

    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: id },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: id },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (!(isLiked)) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: id },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

//dislike blog
const dislikeblog = asyncHandler(async (req, res, next) => {
  try {
    const { blogId } = req.body;
    const { id } = req.user;
    const blog = await Blog.findById(blogId);
    const user = await User.findById(id);

    const isdisliked = blog?.isDisliked;
    console.log(!isdisliked);
    const isLiked = blog?.isLiked;
    // console.log(isLiked)

    // res.json(user);

    // const alreadyLiked = blog?.likes?.find(
    //   (userId) => userId.toString() === id.toString()
    // );
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: id },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isdisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: id },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (!isdisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: id },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
    // console.log(!(isLiked && isdisliked))
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createblog,
  deleteblog,
  updateblog,
  getablog,
  getAllblog,
  likeblog,
  dislikeblog,
};
