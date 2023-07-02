import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El useAuth debe ser usando dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [errors, setErrors] = useState(null);
  const token = localStorage.getItem("token");

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data.username);
      setRol(res.data.rol);
      setIsAuthenticated(true);
      console.log(user);
    } catch (error) {
      console.log(error);
      //setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

      setIsAuthenticated(true);
      setUser(res.data.username);
      setRol(res.data.rol);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("rol", res.data.rol);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("rol");
    setIsAuthenticated(false);
    setUser(null);
    setRol(null);
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("username") &&
      localStorage.getItem("rol")
    ) {
      setIsAuthenticated(true);
      setUser(localStorage.username);
      setRol(localStorage.rol);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setRol(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, user, rol, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
