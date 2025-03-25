import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Dashboard' : 'Landing'}
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen 
              name="Landing" 
              component={LandingPage}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginPage}
              options={{ gestureEnabled: false }}
            />
          </>
        ) : (
          // Protected Stack
          <>
            <Stack.Screen 
              name="Dashboard" 
              component={Dashboard}
              options={{ gestureEnabled: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 