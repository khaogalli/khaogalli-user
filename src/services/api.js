import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://khaogalli.me";
export const RESTAURANT_IMAGE_URL = API_URL + "/api/restaurants/image/";
export const USER_IMAGE_URL = API_URL + "/api/users/image/";
export const ITEM_IMAGE_URL = API_URL + "/api/restaurants/menu/item/image/";

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
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

export const update_push_token = (expo_push_token) => {
  return api.put("/api/users/expo_push_token", { expo_push_token });
};

export const get_restaurants = () => {
  return api.get("/api/restaurants/list");
};

export const get_menu = (ResID) => {
  return api.get("/api/restaurants/menu/" + ResID);
};

export const place_order = (order) => {
  return api.post("/api/orders", { order });
};

export const get_orders = (days) => {
  return api.get("/api/orders/" + days);
};

export const api_update_user = (user) => {
  return api.patch("/api/users", { user });
};

export const upload_user_image = (image) => {
  return api.post("/api/users/upload_image", { image });
};

export const get_payment_session = (orderID) => {
  return api.get("/api/orders/payment/" + orderID);
};

export const stats = () => {
  return api.get("/api/stats/user");
};

export const cancel_order = (orderID) => {
  return api.post("/api/orders/cancel/" + orderID);
};

export const get_noti = () => {
  return api.get("/api/notification/user");
};
export default api;
