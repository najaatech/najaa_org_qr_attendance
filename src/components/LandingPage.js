import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const features = [
  {
    title: 'QR Attendance',
    description: 'Take attendance easily using QR codes',
    icon: 'qr-code-scanner',
    color: '#2196F3',
  },
  {
    title: 'Excuse Records',
    description: 'Submit and manage absence excuses digitally',
    icon: 'description',
    color: '#4CAF50',
  },
  {
    title: 'Schedule View',
    description: 'Access your class and exam schedules',
    icon: 'schedule',
    color: '#FF9800',
  },
  {
    title: 'Academic Calendar',
    description: 'Stay updated with important dates and events',
    icon: 'calendar-today',
    color: '#9C27B0',
  },
  {
    title: 'Notifications',
    description: 'Get instant updates about classes and events',
    icon: 'notifications',
    color: '#F44336',
  },
];

const LandingPage = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    // Reset animations when step changes
    fadeAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < features.length - 1) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentStep(currentStep + 1);
        slideAnim.setValue(0);
        fadeAnim.setValue(1);
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentStep(currentStep - 1);
        slideAnim.setValue(0);
        fadeAnim.setValue(1);
      });
    }
  };

  const getStarted = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Login');
    });
  };

  const contentStyle = {
    transform: [
      { translateX: slideAnim },
      {
        scale: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        }),
      },
    ],
    opacity: fadeAnim,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.slide,
          {
            backgroundColor: features[currentStep].color,
          },
        ]}
      >
        <Animated.View style={[styles.content, contentStyle]}>
          <Icon
            name={features[currentStep].icon}
            size={120}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.title}>{features[currentStep].title}</Text>
          <Text style={styles.description}>
            {features[currentStep].description}
          </Text>
        </Animated.View>

        <View style={styles.footer}>
          <View style={styles.stepper}>
            {features.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepDot,
                  index === currentStep && styles.activeStepDot,
                ]}
              />
            ))}
          </View>

          <View style={styles.navigation}>
            <TouchableOpacity
              style={[styles.navButton, currentStep === 0 && styles.disabledButton]}
              onPress={prevStep}
              disabled={currentStep === 0}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            {currentStep === features.length - 1 ? (
              <TouchableOpacity style={styles.getStartedButton} onPress={getStarted}>
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.navButton}
                onPress={nextStep}
              >
                <Icon name="arrow-forward" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    width: width,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  stepper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeStepDot: {
    backgroundColor: '#fff',
    width: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  getStartedButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  getStartedText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage; 