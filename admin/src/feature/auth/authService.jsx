import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const updateOrderSt = async (id) => {
  const response = await axios.put(`${base_url}user/updateorder/${id}`, config);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-allorder`, config);
  return response.data;
};
const getSingleOrder = async (id) => {
  const response = await axios.get(`${base_url}user/getorder/${id}`, config);
  return response.data;
};

const authService = {
  updateOrderSt,
  login,
  getOrders,
  getSingleOrder,
};

export default authService;
