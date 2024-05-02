import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess, selectEmail, setRefreshToken} from '../Redux/authSlice'; // Import selectEmail
import {useNavigation} from '@react-navigation/native';
import Input from '../Components/Inputs/input';
import Button from '../Components/Buttons/Button';
import styles from '../Style/LoginScreenStyle';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const savedEmail = useSelector(selectEmail);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup' as never);
  };

  const handleLogin = async () => {
    try {
      if (email && password) {
        const response = await fetch(
          'https://backend-practice.euriskomobility.me/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
              token_expires_in: '0.5m',
            }),
          },
        );

        if (response.ok) {
          console.log('Login successful');
          const data = await response.json();
          console.log(data.accessToken);
          console.log('Refresh Token:', data.refreshToken);
          dispatch(setRefreshToken(data.refreshToken));
          dispatch(
            loginSuccess({
              accessToken: data.accessToken,
              email: email,
              userData: null,
              refreshToken: data.refreshToken,
            }),
          );

          console.log('Email saved in Redux store:', savedEmail);

          setEmail('');
          setPassword('');
          navigation.navigate('Drawer' as never);
        } else {
          const errorData = await response.json();
          Alert.alert(
            'Error',
            errorData.message || 'Failed to login. Please try again later.',
          );
        }
      } else {
        Alert.alert('Error', 'Please enter email and password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button onPress={handleLogin} text="Login" type="PRIMARY" />
          <TouchableOpacity onPress={handleNavigateToSignup}>
            <Text style={styles.signupText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../assets/login2.png')}
          style={styles.logoImage}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
