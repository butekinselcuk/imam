import { useContext } from 'react';
import { useAuthContext } from '../context/AuthContext';

export default function useAuth() {
  const { user, setUser } = useAuthContext();
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  return { user, login, logout };
} 