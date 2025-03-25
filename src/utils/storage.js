import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  BIOMETRIC_ENABLED: '@biometric_enabled',
};

export const storage = {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error reading data:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  },
};

export const authStorage = {
  async saveAuthData(token, userData) {
    await Promise.all([
      storage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
      storage.setItem(STORAGE_KEYS.USER_DATA, userData),
    ]);
  },

  async getAuthData() {
    const [token, userData] = await Promise.all([
      storage.getItem(STORAGE_KEYS.AUTH_TOKEN),
      storage.getItem(STORAGE_KEYS.USER_DATA),
    ]);
    return { token, userData };
  },

  async clearAuthData() {
    await Promise.all([
      storage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
      storage.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  },

  async setBiometricEnabled(enabled) {
    return storage.setItem(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled);
  },

  async isBiometricEnabled() {
    const enabled = await storage.getItem(STORAGE_KEYS.BIOMETRIC_ENABLED);
    return enabled === true;
  },
}; 