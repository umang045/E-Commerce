import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProductAll = async () => {
  const response = await axios.get(`${base_url}product/prd`);
  if (response.data) {
    return response.data;
  }
};

const getAllProducts = async (data) => {
  const params = {
    "price[gte]": data.minPrice,
    "price[lte]": data.maxPrice,
    sort: data.sort,
  };
  if (data.brand) {
    params.brand = data.brand;
  }

  if (data.category) {
    params.category = data.category;
  }

  if (data.tag) {
    params.tags = data.tag;
  }
  if (data.page) {
    params.page = data.page;
  }
  console.log(params);
  const response = await axios.get(`${base_url}product`, { params });
  if (response.data) {
    return response.data;
  }
};

const getAProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};
const rateProduct = async (data) => {
  const response = await axios.put(`${base_url}product/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getAllProducts,
  getAProduct,
  rateProduct,
  getProductAll,
};
