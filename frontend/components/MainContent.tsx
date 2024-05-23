import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Preferences from 'app/(tabs)/preferences';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@styles';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ title }: { title: string }) => (
    <View style={styles.tabBarLabelContainer}>
        <Text style={styles.tabBarLabel}>{title}</Text>
    </View>
);

const MainContent: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarActiveTintColor: 'black', // Set the active tab color to black
                tabBarInactiveTintColor: 'gray', // Optionally set the inactive tab color
            }}
        >
            <Tab.Screen
                name="Dieetvoorkeuren"
                component={Preferences}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="list-alt" color={color} size={size} />
                    ), // Add the preference icon here
                    tabBarLabel: () => <CustomTabBarLabel title="Dieetvoorkeuren" />,
                }}
            />

            {/* Uncomment the following line when the scanner is enabled */}
            {/* <Tab.Screen name="Scanner" component={Scanner} /> */}
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        height: 60,
        paddingBottom: 10,
        paddingTop: 10,
    },
    tabBarLabelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarLabel: {
        fontSize: 14,
        color: colors.primary,
    },
    tabBarLabelStyle: {
        fontSize: 14,
    },
});

export default MainContent;
