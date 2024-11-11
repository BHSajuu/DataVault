import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutUser, { loginUser, signupUser } from "../helper/api-communicator";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // login
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  // signup
  const signup = async (name, email, password) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  // logout
  const logout = async () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("Token not found before calling logoutUser");
    //   return;
    // }

    try {
      await logoutUser();
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
