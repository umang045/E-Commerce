import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  //   console.log(response.data);
  return response.data;
};

const createBrands = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);
    console.log(response.data);
  return response.data;
};

const getaBrand = async (id) => {
  // console.log(_id);
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};
const updateaBrand = async (data) => {
  // console.log(_id);
  const response = await axios.put(
    `${base_url}brand/${data.id}`,
    { title: data.brandData.title },
    config
  );
  return response.data;
};

const deleteABrand = async (id) => {
  // console.log(_id);
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrands,
  getaBrand,
  updateaBrand,
  deleteABrand
};

export default brandService;
