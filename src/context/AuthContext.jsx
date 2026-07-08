import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, buildsAPI } from '@/services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'pc-station-token';
const USER_KEY  = 'pc-station-user';

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch { return null; }
  });
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [loading, setLoading] = useState(true); // verifying token on mount

  // On mount: verify stored token is still valid
  useEffect(() => {
    const verify = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const data = await authAPI.getMe();
        setUser(data.user);
      } catch {
        // Token expired or invalid — clear everything
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveAuth(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }

  const login = useCallback(async (email, password) => {
    const data = await authAPI.login(email, password);
    saveAuth(data.token, data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await authAPI.register(name, email, password);
    saveAuth(data.token, data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, []);

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { buildsAPI };
