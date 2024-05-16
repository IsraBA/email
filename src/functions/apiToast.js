import axios from "axios";
import { Bounce, toast } from "react-toastify";

const mainApi = async (method, path, data, headers, pending, success, error) => {
  try {
    let fainlPath = path.startsWith("/") ? path.slice(1) : path;
    let auth = localStorage.token ? { Authorization: "Bearer " + localStorage.token } : {};

    // let baseUrl = 'http://localhost:3002/';
    let baseUrl = 'https://email-server-wnht.onrender.com/';

    const url = `${baseUrl}${fainlPath}`;

    const config = {
      method,
      url,
      data,
        headers: { ...headers, ...auth },
    };

    let response = await toast.promise(axios(config), {
      pending,
      success,
      error,
    });

    // console.log("Response:", response.data);

    return response

  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const get = async (path, data = {}, headers, pending, success, error) => await mainApi("GET", path, data, headers, pending, success, error);

const post = async (path, data = {}, headers, pending, success, error) => await mainApi("POST", path, data, headers, pending, success, error);

const put = async (path, data = {}, headers, pending, success, error) => await mainApi("PUT", path, data, headers, pending, success, error);

const del = async (path, data = {}, headers, pending, success, error) => await mainApi("DELETE", path, data, headers, pending, success, error);

export default { get, post, del, put };
