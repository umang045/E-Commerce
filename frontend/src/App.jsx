import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import OurStore from "./Pages/OurStore";
import Blog from "./Pages/Blog";
import CompareProducts from "./Pages/CompareProducts";
import Wishlist from "./Pages/Wishlist";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import SingleBlog from "./Pages/SingleBlog";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import RefundPolicy from "./Pages/RefundPolicy";
import ShippingPolicy from "./Pages/ShippingPolicy";
import TermAndCondition from "./Pages/TermAndCondition";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
// import { PrivateRoute } from "./routing/privateRoute";
import Order from "./Pages/Order";
import UserProfile from "./Pages/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="my-orders" element={<Order />}></Route>
            <Route path="my-profile" element={<UserProfile />}></Route>

            <Route index element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="contact" element={<Contact />}></Route>
            <Route path="product" element={<OurStore />}></Route>
            <Route path="product/:id" element={<SingleProduct />}></Route>

            <Route path="blog" element={<Blog />}></Route>
            <Route path="blog/:id" element={<SingleBlog />}></Route>
            <Route path="compare-product" element={<CompareProducts />}></Route>
            <Route path="wishlist" element={<Wishlist />}></Route>
            {/* <Route path="my-profile" element={</>}></Route> */}
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="refund-policy" element={<RefundPolicy />}></Route>
            <Route path="shipping-policy" element={<ShippingPolicy />}></Route>
            <Route
              path="term-conditions"
              element={<TermAndCondition />}
            ></Route>
            <Route path="checkout" element={<Checkout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
