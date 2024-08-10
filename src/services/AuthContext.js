import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  setToken,
  api_update_user,
  update_push_token,
} from "./api";
import { usePushNotifications } from "./pushNotification";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { expoPushToken } = usePushNotifications();
  const [userRefresh, setUserRefresh] = useState(true);

  useEffect(() => {
    let check_push_token = async () => {
      if (!expoPushToken) {
        return;
      }
      if (user) {
        if (
          !user.expo_push_token ||
          user.expo_push_token !== expoPushToken.data
        ) {
          try {
            console.log("updating push token", expoPushToken);
            await update_push_token(expoPushToken.data);
            user.expo_push_token = expoPushToken.data;
            setUser(user);
            await AsyncStorage.setItem("user", JSON.stringify(user));
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    check_push_token();
  }, [expoPushToken, userRefresh]);

  const refreshUser = async (user) => {
    setUser(user);
    setToken(user.token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUserRefresh(!userRefresh);
  };

  useEffect(() => {
    const loadUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);

        refreshUser(user);
      }
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const loggedInUser = response.data.user;

      console.log(loggedInUser);
      refreshUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await registerUser({ username, password });
      const loggedInUser = response.data.user;
      refreshUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem("user");
  };

  const update_user = async (user) => {
    try {
      const response = await api_update_user(user);
      const loggedInUser = response.data.user;
      refreshUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, update_user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
