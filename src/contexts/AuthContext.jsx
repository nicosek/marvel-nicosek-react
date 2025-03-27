import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_NAME } from "../constants/auth";
import api from "../api/client";

// Création du contexte
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get(TOKEN_COOKIE_NAME) || null);
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (token, email) => {
    Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 3 });
    setToken(token);

    const name = email.split("@")[0];

    const data = { email, name, favorites: [] };
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);

    // fetch favorites if needed
    fetchFavorites().then((favorites) => {
      const updated = { ...data, favorites };
      setUserData(updated);
      localStorage.setItem("userData", JSON.stringify(updated));
    });
  };

  const handleLogout = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    setToken(null);
    setUserData(null);
    localStorage.removeItem("userData");
  };

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/api/favorites");
      return res.data; // tu adaptes le format ici
    } catch (err) {
      console.error("Failed to fetch favorites", err);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, userData, setUserData, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook d'accès au contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
