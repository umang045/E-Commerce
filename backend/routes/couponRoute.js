const express = require('express')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon, getACoupon } = require("../controller/couponCntrl");
const router = express.Router()

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/",  getAllCoupon);
router.get("/:id",  getACoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = router