import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from '../Redux/authSlice';
import HomePage from '../Screens/HomeScreen';
import AddExpenceScreen from '../Screens/AddExpenceScreen';
import AddBudgetScreen from '../Screens/AddBudgetScreen';
import ProgressScreen from '../Screens/ProgressScreen';
import NewsScreen from '../Screens/NewsScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const showLoginAlert = () => {
    Alert.alert('Login Required', 'Please login to access this feature.', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  if (!isAuthenticated) {
    showLoginAlert();
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#6C63FF',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          marginVertical: 8,
          marginHorizontal: 10,
          height: 55,
          borderRadius: 30,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../assets/progress.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddBudgetScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../assets/budget.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AddExpenceScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../assets/expence.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../assets/progress.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../assets/news.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
