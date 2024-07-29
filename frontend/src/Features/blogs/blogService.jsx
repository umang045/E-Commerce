import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getAllBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);
  if (response.data) {
    return response.data;
  }
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const likeBlog = async (blogId) => {
  console.log(blogId);
  const response = await axios.put(`${base_url}blog/likes`,config, blogId);
  if (response.data) {
    return response.data;
  }
};

const dislikeBlog = async (blogId) => {
  const response = await axios.put(`${base_url}blog/likes`, config, blogId);
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getAllBlogs,
  getABlog,
  likeBlog,
  dislikeBlog,
};
