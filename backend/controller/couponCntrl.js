const Coupon = require("../model/couponModel");
const asynHandler = require("express-async-handler");

//create endpoint for createcoupon
const createCoupon = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//create endpoint for updatecoupon
const updateCoupon = asynHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//create endpoint for delete coupon
const deleteCoupon = asynHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deleteCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//create endpoint for get all coupon
const getAllCoupon = asynHandler(async (req, res) => {
  try {
    const getAllCoupon = await Coupon.find();
    res.json(getAllCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getACoupon = asynHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const getACoupon = await Coupon.findById(id);
    res.json(getACoupon);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  getACoupon,
};
