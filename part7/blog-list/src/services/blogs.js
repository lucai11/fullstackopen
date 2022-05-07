import axios from "axios";
const baseUrl = "/api/blog/";

let token = null;

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getBlog = async (id) => {
  const res = await axios.get(`${baseUrl}${id}`);
  return res.data;
};

const createBlog = async (newBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const postedBlog = await axios.post(baseUrl, newBlog, config);
    return postedBlog.data;
  } catch (err) {
    console.log(err);
  }
};

const updateBlog = async (newBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    const updatedBlog = await axios.put(
      `${baseUrl}${newBlog.id}`,
      newBlog,
      config
    );
    return updatedBlog.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const deleted = await axios.delete(`${baseUrl}${id}`, config);
  return deleted.data;
};

export default {
  getAll,
  getBlog,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
};
