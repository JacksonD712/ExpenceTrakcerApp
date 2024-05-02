import React from 'react';
import DrawerNavigation from './DrawerNavigator';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from '../Redux/authSlice';
import AuthNavigator from './AuthNavigation';

const MainNavigator = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return <>{isAuthenticated ? <DrawerNavigation /> : <AuthNavigator />}</>;
};

export default MainNavigator;
