import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    let role = "worker";

    // ✅ Simple static role mapping
    if (username.toLowerCase() === "owner") {
      role = "owner";
    } else if (username.toLowerCase().includes("rms")) {
      role = "RMS Processing";
    } else if (username.toLowerCase().includes("man")) {
      role = "Manufacturing";
    } else if (username.toLowerCase().includes("dis")) {
      role = "Distribution";
    } else if (username.toLowerCase().includes("ret")) {
      role = "Retail";
    }

    const loggedUser = { username, role };
    setUser(loggedUser);

    // ✅ Save to localStorage for reload persistence
    localStorage.setItem("user", JSON.stringify(loggedUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
