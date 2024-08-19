import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';
import MainNavigator from './src/screens/navigator/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/stores/Store';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import React from 'react';

export type RootStackParamList = {
  Main: undefined;
  "Sign In": undefined;
  Profile: undefined;
  ProductDetail: { productId: number };
  Admin: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </AuthProvider>
  );
};


const AppContent: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ title: 'ReactNativeStarter' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'ReactNativeStarter' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;