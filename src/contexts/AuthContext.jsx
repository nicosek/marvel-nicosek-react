import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_NAME } from "../constants/auth";

// Création du contexte
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get(TOKEN_COOKIE_NAME) || null);

  const handleLogin = (newToken) => {
    Cookies.set(TOKEN_COOKIE_NAME, newToken, { expires: 3 });
    setToken(newToken);
  };

  const handleLogout = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
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
