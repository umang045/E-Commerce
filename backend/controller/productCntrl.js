const asyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
const User = require("../model/userModel");
const slugify = require("slugify");
const fs = require("fs");
const factory = require("./handleFactory");

//const create endpoint for create new Product
const createProduct = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const createproduct = await Product.create(req.body);
    res.json(createproduct);
  } catch (error) {
    throw new Error(error);
  }
});

//const update products
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

//const delete product
const deleteProduct = factory.deletOne(Product);

//const get a product
const getaProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("color");
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductAll = asyncHandler(async (req, res, next) => {
  try {
    const allprdct = await Product.find();
   res.send(allprdct)
  } catch (error) {
    throw new Error(error);
  }
});

//const get a product
const getAllProduct = asyncHandler(async (req, res, next) => {
  try {
    // filtering
    const queryObj = { ...req.query };
    // console.log(queryObj);
    const exclusiveFields = ["page", "sort", "limit", "fields"];
    exclusiveFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // console.log(queryObj)
    // console.log(queryStr);

    //sorting
    if (req.query.sort) {
      // split thi kapay ne array bne
      // .join thi array vy jay ne space rakhi ne bhegu thy jay
      const sortBy = req.query.sort.split(",").join(" ");
      // console.log(sortBy)
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting a fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination

    // console.log(query)
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    // console.log(page  , limit , skip)
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      // console.log(productCount);
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

//rating product
const rating = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;

  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratting.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        { ratting: { $elemMatch: alreadyRated } },
        {
          $set: {
            "ratting.$.star": star,
            "ratting.$.comment": comment,
          },
        },
        { new: true }
      );
    } else {
      const pushrate = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratting: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
    }

    const getallratting = await Product.findById(prodId);
    let totalrating = getallratting.ratting.length;

    let countratting = getallratting.ratting
      .map((item) => item.star)
      .reduce((prev, next) => prev + next, 0);

    let actualrating = Math.round(countratting / totalrating);

    const finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualrating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getAllProduct,
  getProductAll,
  getaProduct,
  updateProduct,
  deleteProduct,
  rating,
};
