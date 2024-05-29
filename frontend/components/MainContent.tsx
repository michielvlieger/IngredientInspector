import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Preferences from 'app/(tabs)/preferences';
import Scanner from 'app/(tabs)/scanner';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@constants';

const Tab = createBottomTabNavigator();

const CustomTabBarLabel = ({ title, color }: { title: string, color: string }) => (
    <View style={styles.tabBarLabelContainer}>
        <Text style={[styles.tabBarLabel, { color }]}>{title}</Text>
    </View>
);

const MainContent: React.FC = () => {
    const colorScheme = Colors[useColorScheme() ?? 'light'];

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: [styles.tabBar, { backgroundColor: colorScheme.background, borderTopColor: colorScheme.tint }],
                tabBarLabelStyle: [styles.tabBarLabelStyle, { color: colorScheme.text }],
                tabBarActiveTintColor: colorScheme.tint,
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Dieetvoorkeuren"
                component={Preferences}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="list-alt" color={color} size={size} />
                    ),
                    tabBarLabel: ({ color }) => <CustomTabBarLabel title="Dieetvoorkeuren" color={color} />,
                }}
            />

            <Tab.Screen name="Scanner" component={Scanner} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="camera" color={color} size={size} />
                ),
                tabBarLabel: ({ color }) => <CustomTabBarLabel title="Scanner" color={color} />,
            }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        borderTopWidth: 1,
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
    },
    tabBarLabelStyle: {
        fontSize: 14,
    },
});

export default MainContent;
