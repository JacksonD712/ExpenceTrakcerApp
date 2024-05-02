import React, {useEffect, useState} from 'react';
import {ScrollView, Text, RefreshControl, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectEmail} from '../Redux/authSlice';
import {fetchUserData, addBudgetData} from '../api/api2';
import BudgetForm from '../Components/Forms/BudgetForm';
import UserDataDisplay from '../Components/Forms/UserDataDisplay';
import styles from '../Style/AddBudgetStyle';
import Warning from '../Components/Warning/Warning';

const AddBudgetScreen: React.FC = () => {
  const [userData, setUserData] = useState(null);
  const [mode, setMode] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const email = useSelector(selectEmail);

  useEffect(() => {
    if (email) {
      fetchUserData(email, setUserData, setMode);
    }
  }, [email]);

  const onRefresh = () => {
    if (email) {
      setRefreshing(true);
      fetchUserData(email, setUserData, setMode);
      setRefreshing(false);
    }
  };

  const handleAddBudget = (budget: any, work: any, time: any) => {
    addBudgetData(email, budget, work, time, setMode, fetchUserData);
  };

  if (!email) {
    return <Warning />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.title}>Welcome {email}</Text>

      {mode === 'input' ? (
        <>
          <BudgetForm handleAddBudget={handleAddBudget} />
        </>
      ) : mode === 'view' ? (
        <>
          <UserDataDisplay userData={userData} />
          <Image
            source={require('../assets/finance.png')}
            style={styles.logoImage}
          />
        </>
      ) : (
        <Warning />
      )}
    </ScrollView>
  );
};

export default AddBudgetScreen;
