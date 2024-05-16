import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ONBOARDING_STEPS } from '@enums';
import ButtonComponent from 'components/Button';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedGestureHandler, withSpring, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import HeaderComponent from 'components/Header';

const { width } = Dimensions.get('window');

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<ONBOARDING_STEPS>(ONBOARDING_STEPS.STEP_1);
  const translateX = useSharedValue(0);

  const nextStep = () => {
    switch (step) {
      case ONBOARDING_STEPS.STEP_1:
        setStep(ONBOARDING_STEPS.STEP_2);
        break;
      case ONBOARDING_STEPS.STEP_2:
        setStep(ONBOARDING_STEPS.STEP_3);
        break;
      case ONBOARDING_STEPS.STEP_3:
        onComplete();
        break;
      default:
        break;
    }
    translateX.value = withSpring(0);
  };

  const prevStep = () => {
    switch (step) {
      case ONBOARDING_STEPS.STEP_2:
        setStep(ONBOARDING_STEPS.STEP_1);
        break;
      case ONBOARDING_STEPS.STEP_3:
        setStep(ONBOARDING_STEPS.STEP_2);
        break;
      default:
        break;
    }
    translateX.value = withSpring(0);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX > width * 0.25) {
        runOnJS(prevStep)();
      } else if (event.translationX < -width * 0.25) {
        runOnJS(nextStep)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderStep = () => {
    switch (step) {
      case ONBOARDING_STEPS.STEP_1:
        return (
          <View style={styles.container}>
            <HeaderComponent uri="https://i.imgur.com/yqWH29P.jpeg" />
            <Text style={styles.title}>Vermijd ongewenste ingrediënten</Text>
            <Text style={styles.description}>
              Geef aan welke ingrediënten je wilt vermijden en wij speuren ze op in producten. Je voorkeuren zijn altijd aanpasbaar.
            </Text>
          </View>
        );
      case ONBOARDING_STEPS.STEP_2:
        return (
          <View style={styles.container}>
            <HeaderComponent uri="https://i.imgur.com/yqWH29P.jpeg" />
            <Text style={styles.title}>Scan de productlabel voor snelle feedback</Text>
            <Text style={styles.description}>
              Richt je camera op de productlabel om snel en eenvoudig te zien of het product bij je dieetvoorkeur past.
            </Text>
          </View>
        );
      case ONBOARDING_STEPS.STEP_3:
        return (
          <View style={styles.container}>
            <HeaderComponent uri="https://i.imgur.com/yqWH29P.jpeg" />
            <Text style={styles.title}>Laten we beginnen</Text>
            <Text style={styles.description}>
              Dit is Ingredient Inspector. Makkelijk hè? Druk op de knop zodra je klaar bent om je dieetvoorkeuren in te stellen.
            </Text>
          </View>
        );
    }
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {renderStep()}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, step === ONBOARDING_STEPS.STEP_1 && styles.activeDot]} />
          <View style={[styles.dot, step === ONBOARDING_STEPS.STEP_2 && styles.activeDot]} />
          <View style={[styles.dot, step === ONBOARDING_STEPS.STEP_3 && styles.activeDot]} />
        </View>
        <View style={styles.continueButtonContainer}>
          <ButtonComponent title={step === ONBOARDING_STEPS.STEP_3 ? 'Beginnen' : 'Verder'} onPress={nextStep} />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  continueButtonContainer: {
    width: '90%',
    margin: 24,
  }
});

export default Onboarding;
