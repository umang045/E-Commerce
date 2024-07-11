import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};

const delImg = async (id) => {
  const response = await axios.delete(`${base_url}upload/delete-img/${id}`,config);
  return response.data;
};

const uploadService = {
  uploadImg,
  delImg
};

export default uploadService;
