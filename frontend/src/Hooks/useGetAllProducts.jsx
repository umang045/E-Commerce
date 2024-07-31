import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { getProductAll } from "../Features/product/productSlice";

//fetch product state

const fetchProd = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductAll());
  }, [getProductAll]);

  const fetchProdState = useSelector(
    (state) => state?.product?.getProductAll,
    shallowEqual
  );

  return fetchProdState;
};

const useGetAllProducts = () => {
  //getall product whenever chage state
  const getAllProdState = fetchProd();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductAll());
  }, [getProductAll]);

  // console.log(getAllProdState);
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

const useProductFunction = () => {
  const getAllProdState = fetchProd();
  let newBrands = [];
  let categories = [];
  let newtags = [];
  for (let index = 0; index < getAllProdState?.length; index++) {
    const element = getAllProdState[index];
    newBrands.push(element?.brand);
    categories.push(element?.category);
    newtags.push(element?.tags);
  }
  // console.log(newBrands, categories, newtags);
  return { newBrands, categories, newtags };
};

export { useGetAllProducts, useCart, useProductFunction };
