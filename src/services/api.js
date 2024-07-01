import axios from "axios";

const API_URL = "http://192.168.88.165:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const loginUser = (user) => {
  return api.post("/api/users/login", { user });
};

export const registerUser = (user) => {
  return api.post("/api/users", { user });
};

export default api;
