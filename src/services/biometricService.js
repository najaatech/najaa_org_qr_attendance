import * as LocalAuthentication from 'expo-local-authentication';

export const biometricService = {
  async isBiometricAvailable() {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      return compatible && enrolled;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  },

  async authenticate() {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access KTech Hub',
        fallbackLabel: 'Use password',
        disableDeviceFallback: false,
        cancelLabel: 'Cancel',
        fallbackToPasscode: true,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  },

  async saveBiometricPreference(enabled) {
    try {
      await LocalAuthentication.setAuthenticationTypeAsync(
        enabled ? LocalAuthentication.AuthenticationType.BIOMETRICS : LocalAuthentication.AuthenticationType.NONE
      );
      return true;
    } catch (error) {
      console.error('Error saving biometric preference:', error);
      return false;
    }
  },
}; 