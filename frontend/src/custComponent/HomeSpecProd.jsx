import React from "react";
import Container from "../Components/Container";
import SpecialProduct from "../Components/SpecialProduct";
const HomeSpecProd = () => {
  return (
    <Container class1="special-warpper py-5 home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <h3 className="section-heading">Special Products</h3>
        </div>
        <div className="row">
          <SpecialProduct />
        </div>
      </div>
    </Container>
  );
};

export default HomeSpecProd;
