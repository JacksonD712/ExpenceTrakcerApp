import React, {useState} from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import Input from '../Components/Inputs/input';
import Button from '../Components/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import styles from '../Style/SignUpScreenstyle';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ageChecked, setAgeChecked] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (!ageChecked) {
        Alert.alert('Warning', 'You must be 18 years or older to sign up.');
        return;
      }
      if (!privacyPolicyChecked) {
        Alert.alert(
          'Warning',
          'You must accept the privacy policy to sign up.',
        );
        return;
      }

      if (!email.includes('@')) {
        Alert.alert('Error', 'Invalid email.');
        return;
      }

      if (!password || !confirmPassword) {
        Alert.alert('Error', 'Password fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }

      const response = await fetch(
        'https://backend-practice.euriskomobility.me/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            token_expires_in: '30m',
          }),
        },
      );

      if (response.ok) {
        console.log('Signup successful');
        navigation.navigate('Login' as never);
      } else {
        const errorData = await response.json();
        Alert.alert(
          'Error',
          errorData.message || 'Failed to sign up. Please try again later.',
        );
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.form}>
          <Text style={styles.title}>Sign Up</Text>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={undefined}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgeChecked(!ageChecked)}>
              {ageChecked ? (
                <Text style={styles.checked}>✓</Text>
              ) : (
                <Text style={styles.unchecked} />
              )}
              <Text style={styles.confirm}>I am 18 years or older</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}>
              {privacyPolicyChecked ? (
                <Text style={styles.checked}>✓</Text>
              ) : (
                <Text style={styles.unchecked} />
              )}
              <Text style={styles.confirm}>I accept the privacy policy</Text>
            </TouchableOpacity>
          </View>

          <Button
            text="Sign Up"
            onPress={handleSignup}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            text="Login"
            onPress={() => navigation.navigate('Login' as never)}
            type="FORGOT"
            bgColor={undefined}
            fgColor={undefined}
          />
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
