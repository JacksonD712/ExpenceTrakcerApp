import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectEmail} from '../Redux/authSlice';
import styles from '../Style/ProgressScreenStyle';

interface Expense {
  Categories: string;
  Price: number;
  Day: number | null;
}

const ProgressScreen: React.FC = () => {
  const email = useSelector(selectEmail);
  const [budget, setBudget] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchBudgetAndTime = async () => {
      try {
        const response = await fetch(
          'https://65fef466b2a18489b386cd90.mockapi.io/api/v1/Expence',
        );
        const data = await response.json();
        const userData = data.find(
          (item: {Email: string}) => item.Email === email,
        );
        if (userData) {
          setBudget(userData.Budget);
          setTime(userData.Time);
        }
      } catch (error) {
        console.error('Error fetching budget and time data:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          `https://65fef466b2a18489b386cd90.mockapi.io/api/v1/Exp?Email=${email}`,
        );
        const data = await response.json();
        const dayExpenses = data.filter(
          (item: Expense) => item.Day === selectedDay,
        );
        setExpenses(dayExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    if (selectedDay !== null) {
      fetchExpenses();
    }

    if (email) {
      fetchBudgetAndTime();
    }
  }, [selectedDay, email]);

  const handleDaySelection = (day: number | null) => {
    setSelectedDay(day);
    setModalVisible(false);
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    for (let i = 1; i <= (time || 0); i++) {
      days.push(
        <TouchableOpacity key={i} onPress={() => handleDaySelection(i)}>
          <Text style={[styles.text, i === selectedDay && styles.selectedDay]}>
            Day {i}
          </Text>
        </TouchableOpacity>,
      );
    }
    return days;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch updated data here
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a delay, replace with actual fetch
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }>
        <View style={styles.card}>
          <Text style={styles.selectedDayText}>
            Selected Day: {selectedDay}
          </Text>
          {email && <Text style={styles.text}>Email: {email}</Text>}
          {budget !== null && <Text style={styles.text}>Budget: {budget}</Text>}
          {time !== null && <Text style={styles.text}>Time: {time}</Text>}
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.showdaystext}>Show Days</Text>
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Days</Text>
                {renderDays()}
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
          {selectedDay && (
            <View style={styles.expensesContainer}>
              {expenses.length === 0 ? (
                <Text style={styles.expense}>
                  No expenses for Day {selectedDay}
                </Text>
              ) : (
                <>
                  <Text style={styles.expensesTitle}>
                    Expenses for Day {selectedDay}:
                  </Text>
                  {expenses.map((expense, index) => (
                    <Text key={index} style={styles.expense}>
                      Category: {expense.Categories}, Price: {expense.Price}
                    </Text>
                  ))}
                </>
              )}
            </View>
          )}
        </View>
        <Image
          source={require('../assets/progress2.png')}
          style={styles.logoImage}
        />
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;
