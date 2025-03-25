import React, { createContext, useState, useContext, useEffect } from 'react';
import { authStorage } from '../utils/storage';
import { biometricService } from '../services/biometricService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    checkAuthState();
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const available = await biometricService.isBiometricAvailable();
    setIsBiometricAvailable(available);
    if (available) {
      const enabled = await authStorage.isBiometricEnabled();
      setIsBiometricEnabled(enabled);
    }
  };

  const checkAuthState = async () => {
    try {
      const { token, userData } = await authStorage.getAuthData();
      if (token && userData) {
        if (isBiometricEnabled) {
          const authenticated = await biometricService.authenticate();
          if (authenticated) {
            setIsAuthenticated(true);
            setUserData(userData);
          } else {
            await logout();
          }
        } else {
          setIsAuthenticated(true);
          setUserData(userData);
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token, userData) => {
    await authStorage.saveAuthData(token, userData);
    setIsAuthenticated(true);
    setUserData(userData);
  };

  const logout = async () => {
    await authStorage.clearAuthData();
    setIsAuthenticated(false);
    setUserData(null);
  };

  const toggleBiometric = async (enabled) => {
    if (enabled) {
      const authenticated = await biometricService.authenticate();
      if (authenticated) {
        await authStorage.setBiometricEnabled(true);
        await biometricService.saveBiometricPreference(true);
        setIsBiometricEnabled(true);
        return true;
      }
      return false;
    } else {
      await authStorage.setBiometricEnabled(false);
      await biometricService.saveBiometricPreference(false);
      setIsBiometricEnabled(false);
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userData,
        isBiometricAvailable,
        isBiometricEnabled,
        login,
        logout,
        toggleBiometric,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 