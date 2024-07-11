const { model } = require("mongoose");
const Brand = require("../model/brandModel");
const asyncHandler = require("express-async-handler");

//create brand
const createBrand = asyncHandler(async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

//delete brand
const deleteBrand = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

//update brand
const updateBrand = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

//get a brand

const getaBrand = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Brand
const getAllBrand = asyncHandler(async (req, res, next) => {
  try {
    const brand = await Brand.find();
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {createBrand , deleteBrand ,updateBrand,getaBrand,getAllBrand}
