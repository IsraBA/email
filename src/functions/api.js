import axios from "axios";

const mainApi = async (method, path, data, headers) => {
  try {
    let fainlPath = path.startsWith("/") ? path.slice(1) : path;
    let auth = localStorage.token ? { Authorization: "Bearer " + localStorage.token } : {};

    // let baseUrl = 'http://localhost:3002/';
    let baseUrl = 'https://email-server-wnht.onrender.com/';

    const url = `${baseUrl}${fainlPath}`;

    const response = await axios({
      method,
      url,
      data,
      headers: { ...headers, ...auth },
    });

    // console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Error:", error?.response?.data);
    throw error;
  }
};

const get = async (path, data = {}, headers) => await mainApi("GET", path, data, headers);

const post = async (path, data = {}, headers) => await mainApi("POST", path, data, headers);

const put = async (path, data = {}, headers) => await mainApi("PUT", path, data, headers);

const del = async (path, data = {}, headers) => await mainApi("DELETE", path, data, headers);

export default { get, post, del, put };
