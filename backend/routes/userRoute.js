const express = require("express");
const {
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
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  getAllOrder,

  addToWishlist,
  getWishlist,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMonthWiseOrderIncome,
  getOrderByOrderId,
  updateOrder,
} = require("../controller/userCntrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { checkout, paymentVerification } = require("../controller/paymentCntrl");
const router = express.Router();

router.put("/updateorder/:id", updateOrder);
router.put(
  "/update-product-cart/:id/:cartItemId/:newQuantiy",

  updateProductQuantityFromCart
);
router.post("/cart/create-order", authMiddleware, createOrder);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);

// router.get("/get-orderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.get("/getorder/:id", authMiddleware, isAdmin, getOrderByOrderId);
router.get("/getmonthincome", authMiddleware, isAdmin, getMonthWiseOrderIncome);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.put("/wishlist", authMiddleware, addToWishlist);
router.get("/get-wishlist", authMiddleware, getWishlist);
router.get("/get-order", authMiddleware, getOrder);
router.get("/get-allorder", getAllOrder);
router.get("/get-cart", authMiddleware, getUserCart);
router.put("/", authMiddleware, updateUser);
router.put("/logout", logout);
router.post("/register", registerUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/admin-login", adminLogin);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.get("/", getAllUser);
router.put("/refresh", handleRefreshToken);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);
router.put("/save-address", authMiddleware, saveAddress);
router.post("/add-cart", authMiddleware, addToCart);
router.post("/cart/coupon", authMiddleware, applyCoupon);

module.exports = router;
