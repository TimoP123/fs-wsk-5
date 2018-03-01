import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = newObject => {
  const request = axios.put(`${baseUrl}/${newObject._id}`, newObject);
  return request.then(response => response.data);
};

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  await axios.delete(`${baseUrl}/${blog._id}`, config);
};

export default { getAll, setToken, create, update, remove };
