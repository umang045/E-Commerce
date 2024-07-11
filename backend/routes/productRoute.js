const express = require("express");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getaProduct,
  getAllProduct,
  rating,
} = require("../controller/productCntrl");
const { get } = require("mongoose");
const router = express.Router();

router.put('/rating',authMiddleware , rating)
router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id",  getaProduct);
router.get("/",getAllProduct);

module.exports = router;
