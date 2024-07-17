const { generateToken } = require("../config/jwtToken");
const User = require("../model/userModel");
const Product = require("../model/productModel");
const Cart = require("../model/cartModel");
const Coupon = require("../model/couponModel");
const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

//create end point for createUser
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const createUser = await User.create(req.body);
    res.json(createUser);
  } catch (error) {
    throw new Error(error);
  }
});

//create end point for deleteUser
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//const updateUser
const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//const get a user
const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//get all User
const getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//create endpoint for loginuser
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 70 * 60 * 60 * 1000,
    });

    res.json({ updateUser });
  } else {
    throw new Error("Invalid Inputs!!");
  }
});

//login Admin
const adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    // User with the provided email address not found
    throw new Error("user not found");
  }

  if (findUser.role !== "admin") {
    throw new Error("You Are Not Authorize");
  }

  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 70 * 60 * 60 * 1000,
    });

    res.json({ updateUser });
  } else {
    throw new Error("Invalid Inputs!!");
  }
});

//create endpoint for Logout
const logout = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No token found in cookies");
  }
  const refreshToken = cookie.refreshToken;
  const findUser = await User.findOne({ refreshToken });
  if (!findUser) {
    throw new Error("User not found with this Token");
  } else {
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.json({ message: "logout Sucessfully" });
  }
});

//handle refresh Token
const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("Cookies not attached");
  }
  const refreshToken = cookie.refreshToken;
  const findUser = await User.findOne({ refreshToken });
  if (!findUser) {
    throw new Error("User not found with This Token");
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
    if (err || findUser.id !== decode.id) {
      throw new Error("User Not Found");
    }
    const accessToken = generateToken(findUser?.id);
    res.json({ accessToken });
  });
});

//create end point for BlockUser
const blockUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({ findUser });
  } catch (error) {
    throw new Error(error);
  }
});

//create endpoint for unbblock user
const unblockUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({ findUser });
  } catch (error) {
    throw new Error(error);
  }
});

//endpoint for save address
const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//add to Cart
const addToCart = asyncHandler(async (req, res, next) => {
  const { pid, color, quantity, price } = req.body;
  const { _id } = req.user;

  try {
    let newCart = await new Cart({
      userId: _id,
      pid,
      color,
      price,
      quantity,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get userCart
const getUserCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const getcart = await Cart.find({ userId: _id })
      .populate("pid")
      .populate("color")
      .populate("userId");
    res.json(getcart);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductFromCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  try {
    const getcart = await Cart.deleteOne({ userId: _id, _id: cartItemId });
    res.json(getcart);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res, next) => {
  // const {  } = req.user;
  const { id, cartItemId, newQuantity } = req.params;

  const queryObj = req.originalUrl;
  const demo = queryObj.split("/");
  const newQuantity1 = parseInt(demo[demo.length - 1]);

  try {
    const updatedCartItem = await Cart.findOneAndUpdate(
      { userId: id, _id: cartItemId },
      { $set: { quantity: newQuantity1 } },
      { new: true }
    );

    res.json(updatedCartItem);
  } catch (error) {
    throw new Error(error);
  }
});

//empry cart
const emptyCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findOne({ _id });
    const cart = await Cart.findOneAndDelete({ orderby: user._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//apply coupon
const applyCoupon = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  try {
    const validcoupon = await Coupon.findOne({ name: coupon });
    if (validcoupon === null) {
      throw new Error("Invalid Coupon");
    }

    //const {} lagvva faraziyat 6e
    const { cartTotal } = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );

    let totalAfterDis = (
      cartTotal -
      (cartTotal * validcoupon.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      {
        orderby: _id,
      },
      {
        totalAfterDis,
      },
      { new: true }
    );
    res.json(totalAfterDis);
  } catch (error) {
    throw new Error(error);
  }
});

//create order
const createOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await Order.create(req.body);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }

  // const {
  //   shippingInfo,
  //   orderItems,
  //   totalPrice,
  //   totalPriceAfterdiscount,
  //   paymentMethod,
  // } = req.body;
  // const { _id } = req.user;

  // try {
  //   const order = await Order.create({
  //     shippingInfo,
  //     orderItems,
  //     totalPrice,
  //     totalPriceAfterdiscount,
  //     paymentMethod,
  //     user: _id,
  //   });
  //   res.json({
  //     order,
  //     success: true,
  //   });
  // } catch (error) {
  //   throw new Error(error);
  // }

  // try {
  //   if (!COD) throw new Error("Order Failed!!");
  //   const user = await User.findById(_id);
  //   const userCart = await Cart.findOne({ orderby: _id });

  //   let finalAmount = 0;
  //   if (couponApplied && userCart.totalAfterDiscount) {
  //     finalAmount = totalAfterDiscount;
  //   } else {
  //     finalAmount = userCart.cartTotal;
  //   }

  //   let newOrder = await new Order({
  //     products: userCart.products,
  //     paymentIntent: {
  //       id: uniqid(),
  //       method: "COD",
  //       amount: finalAmount,
  //       status: "Cash on Delivery",
  //       created: Date.now(),
  //       currency: "usd",
  //     },
  //     orderby: _id,
  //     orderStatus: "Cash on Delivery",
  //   }).save();

  //   let update = userCart.products.map((item) => {
  //     return {
  //       updateOne: {
  //         filter: { _id: item.product._id },
  //         update: { $inc: { quantity: -item.count, sold: +item.count } },
  //       },
  //     };
  //   });

  //   const updated = await Product.bulkWrite(update, {});
  //   res.json({ message: "Sucess" });
  // } catch (error) {
  //   throw new Error(error);
  // }
});

//get order

const getOrder = asyncHandler(async (req, res, next) => {
  try {
    const { _id } = req.user;
    const orderuser = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color")
      .exec();
    res.json(orderuser);
  } catch (error) {
    throw new Error(error);
  }
});

//get All order

const getAllOrder = asyncHandler(async (req, res, next) => {
  try {
    const orderuser = await Order.find().populate("user").exec();
    res.json(orderuser);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrderByOrderId = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const getorder = await Order.findOne({ _id: id })
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json(getorder);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: "Delivered",
      },
      { new: true }
    );
    res.json(updateOrder);
  } catch (error) {
    throw new Error(error);
  }
});

//add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  // console.log(_id,prodId);
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);

    if (alreadyadded) {
      console.log("hello");
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

//get wishlist
const getWishlist = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id).populate("wishlist");
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

//get Month
const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  // console.log(endDate);

  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        amount: { $sum: "$totalPriceAfterDiscount" },
      },
    },
  ]);
  res.json(data);
});

module.exports = {
  registerUser,
  deleteUser,
  loginUser,
  logout,
  updateUser,
  getUser,
  getAllUser,
  handleRefreshToken,
  adminLogin,
  blockUser,
  unblockUser,
  saveAddress,
  addToCart,
  getUserCart,
  removeProductFromCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  getAllOrder,

  updateOrder,
  addToWishlist,
  getWishlist,
  updateProductQuantityFromCart,
  getMonthWiseOrderIncome,
  getOrderByOrderId,
};
