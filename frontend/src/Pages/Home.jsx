import React from "react";
import { ToastContainer } from "react-toastify";
import HomeBanner from "../custComponent/HomeBanner";
import HomeService from "../custComponent/HomeService";
import HomeSpecProd from "../custComponent/HomeSpecProd";
import HomeMrq from "../custComponent/HomeMrq";

function Home() {
  return (
    <>
      <ToastContainer />
      <HomeBanner />
      <HomeService />
      <HomeSpecProd />
      <HomeMrq />
    </>
  );
}

export default Home;
