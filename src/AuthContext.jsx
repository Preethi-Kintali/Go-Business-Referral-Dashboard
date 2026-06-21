import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { login as apiLogin, logout as apiLogout } from "./api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = Cookies.get("jwt_token");
    return {
      isAuthenticated: !!token,
      user: token ? { token } : null,
    };
  });

  const login = (userData) => {
    setAuthState({ isAuthenticated: true, user: userData });
  };

  const logout = () => {
    apiLogout();
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
