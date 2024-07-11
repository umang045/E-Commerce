const ProdCategory = require("../model/prodCatModel");
const asyncHandler = require("express-async-handler");

//create category
const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const category = await ProdCategory.create(req.body);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});

//update category
const updateCategory = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatecat = await ProdCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecat);
  } catch (error) {
    throw new Error(error);
  }
});

// delete category
const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletecat = await ProdCategory.findByIdAndDelete(id);
    res.json(deletecat);
  } catch (error) {
    throw new Error(error);
  }
});

//get one category
const getCategory = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const getcategory = await ProdCategory.findById(id);
    res.json(getcategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get all category
const getAllCategory = asyncHandler(async (req, res, next) => {
  try {
    const getallcategory = await ProdCategory.find({});
    res.json(getallcategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
