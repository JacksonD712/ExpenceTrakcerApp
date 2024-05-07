import {setUserData} from '../Redux/authSlice';
import Config from 'react-native-config';

export const mockapi = Config.API_MOCK;

export const fetchUserData = async (
  email: any,
  setUserData: (arg0: any) => void,
  setMode: (arg0: string) => void,
) => {
  try {
    const response = await fetch(`${mockapi}Expence?Email=${email}`);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setMode(data.length === 0 ? 'input' : 'view');
    } else {
      setMode('input');
    }
  } catch (error) {
    setMode('input');
  }
};

export const addBudgetData = async (
  email: any,
  budget: any,
  work: any,
  time: any,
  setMode: (arg0: string) => void,
  fetchUserData: (arg0: any, arg1: any, arg2: any) => void,
) => {
  const newBudgetData = {Budget: budget, Email: email, Work: work, Time: time};

  try {
    const response = await fetch(`${mockapi}Expence?Email=${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBudgetData),
    });
    const data = await response.json();
    console.log('Success:', data);
    setMode('view');
    fetchUserData(email, setUserData, setMode);
  } catch (error) {
    console.error('Error:', error);
  }
};
