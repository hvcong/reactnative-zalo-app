import axios from "axios";
import queryString from "query-string";
import store from "../store";

const axiosClient = axios.create({
  baseURL: "http://13.212.252.189:3000/",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // handle token here
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return {
        isSuccess: true,
        ...response.data,
      };
    }
    return {
      isSuccess: true,
      ...response,
    };
  },
  (error) => {
    console.log("Response Error:", error);
    return {
      isSuccess: false,
    };
  }
);

export default axiosClient;
