import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./Components/MainLayout";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Enquiries from "./Pages/Enquiries";
import Bloglist from "./Pages/Bloglist";
import BlogCatlist from "./Pages/BlogCatlist";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Colorlist from "./Pages/Colorlist";
import Categorylist from "./Pages/Categorylist";
import Brandlist from "./Pages/Brandlist";
import Productlist from "./Pages/Productlist";
import Addblog from "./Pages/Addblog";
import Addblogcat from "./Pages/Addblogcat";
import Addcolor from "./Pages/Addcolor";
import Addcat from "./Pages/Addcat";
import Addbrand from "./Pages/Addbrand";
import AddProduct from "./Pages/AddProduct";
import Couponlist from "./Pages/ListCoupon";
import AddCoupon from "./Pages/Addcoupon";
import ViewEnq from "./Pages/ViewEnq";
import ViewOrder from "./Pages/ViewOrder";





function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="enquiries" element={<Enquiries />}></Route>
            <Route path="enquiries/:id" element={<ViewEnq />}></Route>
            <Route path="blog" element={<Addblog />}></Route>
            <Route path="blog/:id" element={<Addblog />}></Route>
            {/* <Route path="blog-list/:id" element={<Addblog />}></Route> */}
            <Route path="blog-list" element={<Bloglist />}></Route>
            <Route path="blog-category-list" element={<BlogCatlist />}></Route>
            <Route path="blog-category" element={<Addblogcat />}></Route>
            <Route path="blog-category-list/:id" element={<Addblogcat />}></Route>
            <Route path="blog-category/:id" element={<Addblogcat />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="orders/:id" element={<ViewOrder />}></Route>
            <Route path="customers" element={<Customers />}></Route>
            <Route path="list-color" element={<Colorlist />}></Route>
            <Route path="color" element={<Addcolor />}></Route>
            <Route path="color/:id" element={<Addcolor />}></Route>
            <Route path="category" element={<Addcat />}></Route>
            <Route path="category/:id" element={<Addcat />}></Route>
            <Route path="list-category" element={<Categorylist />}></Route>
            <Route path="list-brand" element={<Brandlist />}></Route>
            <Route path="brand" element={<Addbrand />}></Route>
            <Route path="brand/:id" element={<Addbrand />}></Route>
            <Route path="list-product" element={<Productlist />}></Route>
            <Route path="product" element={<AddProduct />}></Route>
            <Route path="coupon-list" element={<Couponlist />}></Route>
            <Route path="coupon" element={<AddCoupon />}></Route>
            <Route path="coupon/:id" element={<AddCoupon />}></Route>
       
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
