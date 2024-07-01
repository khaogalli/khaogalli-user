import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "./api";

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

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
