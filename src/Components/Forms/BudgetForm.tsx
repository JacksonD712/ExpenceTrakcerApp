import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styles from '../../Style/AddBudgetStyle';

interface BudgetFormProps {
  handleAddBudget: (budget: string, work: string, time: string) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({handleAddBudget}) => {
  const [budget, setBudget] = useState<string>('');
  const [work, setWork] = useState<string>('');
  const [time, setTime] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text>Please enter your budget information:</Text>
      <TextInput
        style={styles.input}
        placeholder="Budget"
        value={budget}
        onChangeText={text => setBudget(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Work"
        value={work}
        onChangeText={text => setWork(text)}
        placeholderTextColor="#c0c0c0"
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={text => setTime(text)}
        keyboardType="numeric"
        placeholderTextColor="#c0c0c0"
      />
      <Button
        title="Add Budget"
        onPress={() => handleAddBudget(budget, work, time)}
      />
    </View>
  );
};

export default BudgetForm;
