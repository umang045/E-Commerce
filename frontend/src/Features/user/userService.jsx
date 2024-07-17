import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);

  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
    localStorage.setItem("id", JSON.stringify(response.data?.updateUser?._id));
  }
  return response.data;
};

const addToWishlist = async (prodId) => {
  // console.log(prodId);
  const response = await axios.put(
    `${base_url}user/wishlist`,
    { prodId },
    config
  );
  return response.data;
};

const getWishlist = async () => {
  // console.log(prodId);
  const response = await axios.get(`${base_url}user/get-wishlist`, config);
  return response.data;
};

const addToCart = async (data) => {
  // console.log(prodId);
  const response = await axios.post(`${base_url}user/add-cart`, data, config);
  return response.data;
};

const getCart = async () => {
  // console.log(prodId);
  const response = await axios.get(`${base_url}user/get-cart`, config);
  return response.data;
};

const removeProductfromCart = async (id) => {
  // console.log(prodId);
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${id}`,

    config
  );
  return response.data;
};

const updateProductfromCart = async (cartDetail) => {
  console.log(cartDetail);
  const response = await axios.put(
    `${base_url}user/update-product-cart/${cartDetail._id}/${cartDetail?.cartItemId}/${cartDetail?.quantity}`
  );
  return response.data;
};

const getUserOrders = async () => {
  // console.log(prodId);
  const response = await axios.get(`${base_url}user/get-order`, config);
  return response.data;
};

export const userService = {
  register,
  login,
  addToWishlist,
  getWishlist,
  getCart,
  addToCart,
  removeProductfromCart,
  updateProductfromCart,
  getUserOrders,
};
