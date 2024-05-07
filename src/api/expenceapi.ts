import {Alert} from 'react-native';
import {mockapi} from './api2';

export const fetchData = async (
  email: any,
  setBudgetAndTime: (arg0: any) => void,
  setRefreshing: (arg0: boolean) => void,
) => {
  try {
    const response = await fetch(`${mockapi}Expence?Email=${email}`);
    if (response.ok) {
      const data = await response.json();
      const filteredData = data.map((item: {Budget: any; Time: any}) => ({
        budget: item.Budget,
        time: item.Time,
      }));
      setBudgetAndTime(filteredData);
    } else {
      throw new Error('Failed to fetch budget and time data');
    }
  } catch (error) {
    console.error('Error fetching budget and time data:', error);
  } finally {
    setRefreshing(false);
  }
};

export const saveExpense = async (
  category: any,
  price: string,
  email: any,
  selectedDay: any,
  setCategory: (arg0: string) => void,
  setPrice: (arg0: string) => void,
) => {
  if (!category || !price || !email || !selectedDay) {
    console.error('Please fill all fields');
    return;
  }

  try {
    const response = await fetch(`${mockapi}Exp?Email=${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Categories: category,
        Price: parseFloat(price),
        Email: email,
        Day: selectedDay,
      }),
    });
    if (response.ok) {
      console.log('Expense saved successfully');
      setCategory('');
      setPrice('');
      Alert.alert('Expense saved successfully');
    } else {
      throw new Error('Failed to save expense');
    }
  } catch (error) {
    console.error('Error saving expense:', error);
    Alert.alert('Failed to save expense. Please try again.');
  }
};
