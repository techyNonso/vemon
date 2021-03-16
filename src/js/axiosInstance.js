// authAxios.js
const axios = require("axios");
const Store = require("./src/js/store");
const store = new Store();
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { Accept: "application/json" },
  headers: { "Content-Type": "application/json" }
});

axiosInstance.interceptors.request.use(
  config => {
    const tokens = store.getTokens().access;
    if (token) {
      config.headers["Authorization"] = "JWT " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    //check if refresh token was bounced
    if (
      error.response.status === 401 &&
      originalRequest.url === "api/token/refresh/"
    ) {
      router.push("/login");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("api/token/refresh/", {
          refresh_token: store.getTokens().refresh
        })
        .then(res => {
          if (res.status === 201) {
            // 1) put token to LocalStorage with old refresh token
            store.setTokens(res.data, store.getTokens().refresh);

            // 2) Change Authorization header
            axios.defaults.headers.common["Authorization"] =
              "JWT " + store.getTokens().access;

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        });
    }
    // return Error object with Promise
    return Promise.reject(error);
  }
);
