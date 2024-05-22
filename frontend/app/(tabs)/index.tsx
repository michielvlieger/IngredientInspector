import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ONBOARDING_STEPS } from '@enums';
import Onboarding from './onboarding';
import { getAllUsers, updateOnboardingStatusInDatabase } from '@services';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainContent from 'components/MainContent';

const Index: React.FC = () => {
    const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
    const [currentStep, setCurrentStep] = useState<ONBOARDING_STEPS>(ONBOARDING_STEPS.STEP_1);

    useEffect(() => {
        const fetchOnboardingStatus = async () => {
            const user = (await getAllUsers())[0];
            const userStep = user.onboarding;
            setOnboardingComplete(userStep === ONBOARDING_STEPS.COMPLETED);
            setCurrentStep(userStep);
        };

        fetchOnboardingStatus();
    }, []);

    const handleOnboardingComplete = async (currentStep: ONBOARDING_STEPS) => {
        const user = (await getAllUsers())[0];
        if (!user?.id) {
            console.error("User ID is empty.");
            return;
        }
        await updateOnboardingStatusInDatabase(user.id, currentStep);
        setCurrentStep(currentStep);
        if (currentStep === ONBOARDING_STEPS.COMPLETED) {
            setOnboardingComplete(true);
        }
    };

    if (onboardingComplete === null) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer independent={true}>
                {onboardingComplete ? (
                    <MainContent />
                ) : (
                    <Onboarding onComplete={handleOnboardingComplete} initialStep={currentStep} />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default Index;
