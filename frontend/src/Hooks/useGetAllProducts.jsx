import React from "react";
import { useSelector, shallowEqual } from "react-redux";

//fetch product state
const useGetAllProducts = () => {
  //getall product whenever chage state
  const getAllProdState = useSelector(
    (state) => state?.product?.getProductAll,
    shallowEqual
  );

  //store data for search functionality
  let data = [];
  for (let index = 0; index < getAllProdState?.length; index++) {
    const element = getAllProdState[index];
    data.push({ id: index, prod: element?._id, name: element?.title });
  }
  return { getAllProdState, data };
};

//fetch Cart State
const useCart = () => {
  const cartState = useSelector((state) => state?.auth?.getCart, shallowEqual);
  let sum = 0;
  for (let index = 0; index < cartState?.length; index++) {
    sum += Number(cartState[index]?.quantity) * cartState[index]?.price;
  }
  return { cartState, sum };
};

export { useGetAllProducts, useCart };
