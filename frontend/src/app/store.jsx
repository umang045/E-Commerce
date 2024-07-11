import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/user/userSlice";
import productReducer from "../Features/product/productSlice";
import blogReducer from "../Features/blogs/blogSlice";
import contactReducer from "../Features/contact/contactSlice";


export const store = configureStore({
  reducer: {
    auth: userReducer,
    product: productReducer,
    blog :blogReducer,
    enq : contactReducer
  },
});
