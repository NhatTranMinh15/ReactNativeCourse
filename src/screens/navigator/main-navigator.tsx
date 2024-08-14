// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../home-screen';
import { ProfileScreen } from '../profile-screen';
import { Image, StyleSheet, Text } from 'react-native';
import ListScreen from '../list-screen';
import { SignInScreen } from '../signin-screen';
import { useAuth } from '../../contexts/auth-context';
import { AdminScreen } from '../admin-screen';

const Tab = createBottomTabNavigator();

interface IMainNavigator {
    navigation: any
}

const MainNavigator: React.FC<IMainNavigator> = ({ navigation }) => {
    const { user, login, logout } = useAuth();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, }}>
            <Tab.Screen name="Home" component={user ? HomeScreen : SignInScreen} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../../assets/images/home.png')} style={styles.icon} />
                ),
            }} />

            {/* <Tab.Screen name="Tab3" component={ListScreen} options={{
                tabBarLabel: 'List',
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../../assets/images/list.png')} style={styles.icon} />
                ),
            }} /> */}

            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Image source={require('../../assets/images/person.png')} style={styles.icon} />
                ),
            }} />
            {
                !user ?
                    <Tab.Screen name="Sign In" component={SignInScreen} options={{
                        tabBarLabel: 'Sign In',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../assets/images/person.png')} style={styles.icon} />
                        ),
                    }} />
                    : null
            }
            {
                user && user.role === "admin" ? <Tab.Screen name="Admin" component={AdminScreen} options={{
                    tabBarLabel: 'Admin',
                    tabBarIcon: ({ color, size }) => (
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