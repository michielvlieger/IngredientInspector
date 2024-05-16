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

    useEffect(() => {
        const fetchOnboardingStatus = async () => {
            const user = (await getAllUsers())[0];
            setOnboardingComplete(user.onboarding === ONBOARDING_STEPS.COMPLETED);
        };

        fetchOnboardingStatus();
    }, []);



    const handleOnboardingComplete = async () => {
        const user = (await getAllUsers())[0];
        if (!user?.id) {
            console.error("User ID is empty.");
            return;
        }
        await updateOnboardingStatusInDatabase(user.id, ONBOARDING_STEPS.COMPLETED);
        setOnboardingComplete(true);
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
                    <Onboarding onComplete={handleOnboardingComplete} />
                )}
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default Index;
