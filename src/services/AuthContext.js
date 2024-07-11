import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser, setToken, api_update_user } from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        setUser(user);
        setToken(user.token);
      }
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const loggedInUser = response.data.user;
      setUser(loggedInUser);
      console.log(loggedInUser);
      setToken(loggedInUser.token);
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await registerUser({ username, password });
      const loggedInUser = response.data.user;
      setUser(loggedInUser);
      setToken(loggedInUser.token);
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
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
      setUser(loggedInUser);
      setToken(loggedInUser.token);
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
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
