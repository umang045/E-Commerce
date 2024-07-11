import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const createEnq = async (enqData) => {
    // console.log(enqData);
  const response = await axios.post(`${base_url}enquiry/`,enqData , config);
  if (response.data) {
    return response.data;
  }
};

export const enqService = {
  createEnq,
};
