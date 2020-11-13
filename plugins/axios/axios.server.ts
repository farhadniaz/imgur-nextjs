import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const $axios = axios.create({
  baseURL: serverRuntimeConfig.IMGUR_BASE_API_URL,
});

$axios.interceptors.request.use(
  (config) => {
    if (!process.browser) {
      config.headers["Authorization"] =
        "Client-ID " + serverRuntimeConfig.IMGURClientID;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default $axios;
