import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ navigation }) => {
  const { login } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await loginApi(studentId, password);
        
        // Use the auth context to handle login
        await login(response.token, {
          studentId,
          ...response.userData,
        });
      } catch (error) {
        Alert.alert(
          'Login Failed',
          error.message || 'An error occurred during login. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLinkPress = (link) => {
    // Handle link navigation here
    console.log('Link pressed:', link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>KTech Hub</Text>
            <Text style={styles.subtitle}>Welcome Back!</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Icon name="person" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Student ID"
                value={studentId}
                onChangeText={setStudentId}
                autoCapitalize="none"
                keyboardType="number-pad"
                editable={!isLoading}
              />
            </View>
            {errors.studentId && (
              <Text style={styles.errorText}>{errors.studentId}</Text>
            )}

            <View style={styles.inputContainer}>
              <Icon name="lock" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity 
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled
              ]} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={[styles.linkButton, isLoading && styles.linkButtonDisabled]}
                onPress={() => handleLinkPress('about')}
                disabled={isLoading}
              >
                <Text style={[styles.linkText, isLoading && styles.linkTextDisabled]}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.linkButton, isLoading && styles.linkButtonDisabled]}
                onPress={() => handleLinkPress('privacy')}
                disabled={isLoading}
              >
                <Text style={[styles.linkText, isLoading && styles.linkTextDisabled]}>Privacy Policy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.linkButton, isLoading && styles.linkButtonDisabled]}
                onPress={() => handleLinkPress('support')}
                disabled={isLoading}
              >
                <Text style={[styles.linkText, isLoading && styles.linkTextDisabled]}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    minHeight: 52,
  },
  loginButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    flexWrap: 'wrap',
  },
  linkButton: {
    padding: 10,
  },
  linkButtonDisabled: {
    opacity: 0.5,
  },
  linkText: {
    color: '#2196F3',
    fontSize: 14,
  },
  linkTextDisabled: {
    color: '#90CAF9',
  },
});

export default LoginPage; 