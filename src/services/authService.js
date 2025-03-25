import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from '../config/api';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

export const login = async (userId, password) => {
  try {
    const deviceInfo = {
      deviceOs: Platform.OS,
      deviceModel: Device.modelName || 'Unknown',
      deviceSerial: Device.deviceId || 'Unknown',
    };

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({
        userId,
        password,
        ...deviceInfo,
      }),
    });

    if (!response.ok) {
      console.log(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}; 