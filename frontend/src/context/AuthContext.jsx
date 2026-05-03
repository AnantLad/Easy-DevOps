import { createContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

export const AuthContext = createContext(null);

// ✅ Safe localStorage parser
const getStoredUser = () => {
  try {
    const item = localStorage.getItem("user");
    return item && item !== "undefined" ? JSON.parse(item) : null;
  } catch (err) {
    console.warn("Invalid user in localStorage");
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => getStoredUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile when token exists
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]); // ✅ fixed dependency

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const userData = await authAPI.getProfile();

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setError(null);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, username) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authAPI.signup(email, password, username);
      const { token: jwtToken, user: userData } = response;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setToken(jwtToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (err) {
      const errorMessage = err.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

const login = async (email, password) => {
  try {
    setLoading(true);
    setError(null);

    const response = await authAPI.login(email, password);

    // ✅ Extract from response.data (axios interceptor returns response.data)
    const { data } = response;
    const {
      accessToken,
      refreshToken,
      user: userData
    } = data;

    // ✅ Store tokens properly
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Update state
    setToken(accessToken);
    setUser(userData);

    return { success: true, user: userData };
  } catch (err) {
    const errorMessage = err.message || "Login failed";
    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setError(null);
  };

  const updateProfile = async (data) => {
    try {
      setLoading(true);

      const updatedUser = await authAPI.updateProfile(data);

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setError(null);
      return { success: true, user: updatedUser };
    } catch (err) {
      const errorMessage = err.message || "Update failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        error,
        signup,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;