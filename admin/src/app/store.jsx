import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import customerReducer from "../feature/customers/customerSlice";
import productReducer from "../feature/product/productSlice";
import brandReducer from "../feature/brand/brandSlice";
import pcategoryReducer from "../feature/pcategory/pcategorySlice";
import colorReducer from "../feature/color/colorSlice";
import blogcatReducer from "../feature/blogcat/blogcatSlice";
import allblogReducer from "../feature/allblogs/allblogSlice";
import couponReducer from "../feature/coupon/couponSlice";
import enquiriesReducer from "../feature/enquiry/enquiriesSlice";
import uploadReducer from "../feature/upload/uploadSlice";




export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pcategory: pcategoryReducer,
    color: colorReducer,
    blog: blogcatReducer,
    allblog: allblogReducer,
    coupon:couponReducer,
    enquiry : enquiriesReducer,
    upload : uploadReducer              
  },
});
