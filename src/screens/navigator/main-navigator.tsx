/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home-screen';
import { ProfileScreen } from '../profile-screen';
import { Image, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { AdminScreen } from '../admin-screen';
import SignInScreen from '../signin-screen';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
    const { user } = useAuth();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, }}>
            <Tab.Screen name="Home" component={user ? HomeScreen : SignInScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => (
                    <Image source={require('../../assets/images/home.png')} style={styles.icon} />
                ),
            }} />

            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: () => (
                    <Image source={require('../../assets/images/person.png')} style={styles.icon} />
                ),
            }} />
            {
                !user ?
                    <Tab.Screen name="Sign In" component={SignInScreen} options={{
                        tabBarLabel: 'Sign In',
                        tabBarIcon: () => (
                            <Image source={require('../../assets/images/person.png')} style={styles.icon} />
                        ),
                    }} />
                    : null
            }
            {
                user && user.role === "admin" ? <Tab.Screen name="Admin" component={AdminScreen} options={{
                    tabBarLabel: 'Admin',
                    tabBarIcon: () => (
                        <Image source={require('../../assets/images/person.png')} style={styles.icon} />
                    ),
                }} /> : null
            }
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default MainNavigator;