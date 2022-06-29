import axios from "axios";
require("dotenv").config();
var token;

// Deafult configuration of axios
function user_data() {
  try {
    const data = JSON.parse(localStorage.getItem("userInfo"));
    return data;
  } catch {
    return null;
  }
}

let user_detail = user_data();

const myApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `JWT ${user_detail?.access}`,
    "content-type": "application/json",
  },
});

myApi.interceptors.request.use(
  (config) => {
    try {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      config.headers.Authorization = `JWT ${data?.access}`;
      return config;
    } catch {
      return null;
    }
  },
  (error) => Promise.reject(error)
);

export default myApi;
