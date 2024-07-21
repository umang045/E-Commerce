const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dbconnect = require("./config/dbConnection");
const { notFound, errorHandler } = require("./middleware/errorHandling");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const blogCatRouter = require("./routes/blogcatRoute");
const blogRouter = require("./routes/blogRoute");
const brandRouter = require("./routes/brandRoute");
const prodCat = require("./routes/prodCatRoute");
const coupon = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");

const corsOptions = {
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

dbconnect();

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", blogCatRouter);
app.use("/api/blog", blogRouter);
app.use("/api/brand", brandRouter);
app.use("/api/product-category", prodCat);
app.use("/api/coupon", coupon);
app.use("/api/upload", uploadRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server running on ${PORT}`);
});
