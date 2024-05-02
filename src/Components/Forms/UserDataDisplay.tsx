import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../Style/AddBudgetStyle';

interface UserData {
  id: string;
  Budget: number;
  Work: string;
  Time: string;
}

interface Props {
  userData: UserData[] | null;
}

const UserDataDisplay: React.FC<Props> = ({userData}) => {
  if (!userData) {
    return null;
  }

  return (
    <View style={styles.userContainer}>
      {userData.map(user => (
        <View key={user.id}>
          <Text style={styles.tet}>Your budget</Text>
          <Text style={styles.text}>Budget: {user.Budget}</Text>
          <Text style={styles.text}>Work: {user.Work}</Text>
          <Text style={styles.text}>Time: {user.Time}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserDataDisplay;
