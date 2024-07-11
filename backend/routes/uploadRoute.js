const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCntrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const { productImgResize, uploadImg } = require("../middleware/uploadImg");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadImg.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
