import axios from "axios";

export default defineNuxtPlugin(() => {
  const axiosPlugin = axios.create();
  axiosPlugin.defaults.baseURL = `http://localhost:8080`;
  axiosPlugin.defaults.withCredentials = true;

  return {
    provide: { axios: axiosPlugin },
  };
});
