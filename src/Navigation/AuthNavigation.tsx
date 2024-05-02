import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from '../Redux/authSlice';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import DrawerNavigation from './DrawerNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Drawer" component={DrawerNavigation} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
