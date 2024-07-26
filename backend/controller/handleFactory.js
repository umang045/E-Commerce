const { generateToken } = require("../config/jwtToken");
const User = require("../model/userModel");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const Coupon = require("../model/couponModel");
const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

exports.deletOne = Model =>  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await Model.findByIdAndDelete(id);
      res.json(doc);
    } catch (error) {
      throw new Error(error);
    }
  });