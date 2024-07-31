import React from "react";
import HeaderTopStrip from "../custComponent/HeaderTopStrip";
import HeaderBottom from "../custComponent/HeaderBottom";
import HeaderUpper from "../custComponent/HeaderUpper";

function Header() {
  return (
    <>
      <HeaderTopStrip />
      <HeaderUpper />
      <HeaderBottom />
    </>
  );
}

export default Header;
