const express = require("express");
const router = express.Router();

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controller/prodCatCntrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllCategory);

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", authMiddleware, isAdmin, getCategory);

module.exports = router;
