import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getPcategory = async () => {
  const response = await axios.get(`${base_url}product-category/`);
  //   console.log(response.data);
  return response.data;
};

const createPcategory = async (pcategory) => {
  const response = await axios.post(
    `${base_url}product-category/`,
    pcategory,
    config
  );
  //   console.log(response.data);
  return response.data;
};

const getAProductCategory = async (id) => {
  const response = await axios.get(`${base_url}product-category/${id}`, config);

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}product-category/${id}`, config);

  return response.data;
};
const updateProductCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}product-category/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};

const pcategoryService = {
  getPcategory,
  createPcategory,
  getAProductCategory,
  deleteProductCategory,
  updateProductCategory
};

export default pcategoryService;
