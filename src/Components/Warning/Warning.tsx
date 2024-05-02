import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Warning = () => {
  return (
    <View>
      <Image
        source={require('../../assets/alert.png')}
        style={styles.logoImage}
      />
      <Text style={styles.title}> Please login to add a budget </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoImage: {
    width: 40,
    height: 40,
  },
});
export default Warning;
