import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}category/`);
  //   console.log(response.data);
  return response.data;
};

const createBlogCategory = async (bcat) => {
  const response = await axios.post(`${base_url}category/`, bcat, config);

  return response.data;
};

const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}category/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );

  return response.data;
};
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);

  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);

  return response.data;
};
const blogService = {
  getBlogs,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default blogService;
