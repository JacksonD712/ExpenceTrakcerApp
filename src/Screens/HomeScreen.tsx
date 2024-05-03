import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import styles from '../Style/HomeScreenStyle';

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/jackson.png')} style={styles.logo} />
      </View>
      <Text style={styles.welcomeText}>Welcome to J Expences</Text>
      <Text style={styles.descriptionText}>
        Managing your expenses has never been easier.
      </Text>
    </SafeAreaView>
  );
};

export default HomePage;
