import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout, userData, isBiometricAvailable, isBiometricEnabled, toggleBiometric } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleBiometricToggle = async (value) => {
    const success = await toggleBiometric(value);
    if (!success) {
      Alert.alert(
        'Biometric Authentication',
        'Failed to enable biometric authentication. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome, {userData?.studentId || 'Student'}!
        </Text>

        {isBiometricAvailable && (
          <View style={styles.settingContainer}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Icon name="fingerprint" size={24} color="#666" />
                <Text style={styles.settingText}>Biometric Authentication</Text>
              </View>
              <Switch
                value={isBiometricEnabled}
                onValueChange={handleBiometricToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isBiometricEnabled ? '#2196F3' : '#f4f3f4'}
              />
            </View>
            <Text style={styles.settingDescription}>
              Use your device's biometric authentication (fingerprint/face) to securely access the app
            </Text>
          </View>
        )}

        {/* Add your dashboard content here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  settingContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 34,
  },
});

export default Dashboard; 