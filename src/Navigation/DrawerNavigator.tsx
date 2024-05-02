import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import TabsNavigator from './TabNavigator';
import LogoutScreen from '../Screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/budget.png')}
          style={styles.logoImage}
        />
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#6C63FF',
        drawerActiveTintColor: 'white',
      }}>
      <Drawer.Screen name="Expence Tracker" component={TabsNavigator} />
      <Drawer.Screen
        name="Log out"
        options={{drawerLabel: 'Log out'}}
        component={LogoutScreen}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default DrawerNavigation;
