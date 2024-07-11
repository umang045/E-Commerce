const Blogcat = require("../model/blogCatModel");
const asyncHandler = require("express-async-handler");

//create category
const createBlogCat = asyncHandler(async (req, res, next) => {
  try {
    const blogcat = await Blogcat.create(req.body);
    res.json(blogcat);
  } catch (error) {
    throw new Error(error);
  }
});

//delete category
const deleteBlogCat = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogcat = await Blogcat.findByIdAndDelete(id);
    res.json(blogcat);
  } catch (error) {
    throw new Error(error);
  }
});

//update category
const updateBlogCat = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogcat = await Blogcat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(blogcat);
  } catch (error) {
    throw new Error(error);
  }
});

//get one cat
const getaBlogCat = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogcat = await Blogcat.findById(id);
    res.json(blogcat);
  } catch (error) {
    throw new Error(error);
  }
});

//get ALl cat
const getAllBlogCat = asyncHandler(async (req, res, next) => {
  try {
    const blogcat = await Blogcat.find();
    res.json(blogcat);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogCat,
  getAllBlogCat,
  getaBlogCat,
  deleteBlogCat,
  updateBlogCat,
};
