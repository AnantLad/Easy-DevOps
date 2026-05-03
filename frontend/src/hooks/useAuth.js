import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook to access AuthContext
 * Provides easier access to auth state and methods
 * 
 * @returns {Object} Auth context value
 * @throws {Error} If used outside AuthProvider
 * 
 * @example
 * const { user, token, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
