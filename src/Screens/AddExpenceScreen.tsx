import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Modal,
  RefreshControl,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectEmail} from '../Redux/authSlice';
import {fetchData, saveExpense} from '../api/expenceapi';
import styles from '../Style/AddExpenceStyle';
import ModalContent from '../Components/Modal/ModalContent';

interface ExpenseData {
  budget: number;
  time: string;
}

const AddExpenceScreen: React.FC = () => {
  const [budgetAndTime, setBudgetAndTime] = useState<ExpenseData[]>([]);
  const [selectedItem, setSelectedItem] = useState<ExpenseData | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const email: string | null = useSelector(selectEmail);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchData(email, setBudgetAndTime, setRefreshing);
  }, [email]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(email, setBudgetAndTime, setRefreshing);
  };

  return email ? (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.title}>Add Expense Screen</Text>
        {budgetAndTime.map((item, index) => (
          <View key={index}>
            <Text style={styles.text}>Budget: {item.budget}</Text>
            <Text style={styles.text}>Time: {item.time}</Text>
          </View>
        ))}
        {selectedDay && (
          <Text style={styles.selectedDayText}>
            Selected Day: {selectedDay}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={text => setCategory(text)}
          placeholderTextColor="#c0c0c0"
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={text => setPrice(text)}
          keyboardType="numeric"
          placeholderTextColor="#c0c0c0"
        />
        <Pressable
          style={styles.selectedDay}
          onPress={() => {
            if (budgetAndTime.length > 0) {
              setSelectedItem(budgetAndTime[0]);
              setModalVisible(true);
            }
          }}>
          <Text style={styles.selectdaytext}>Select A day</Text>
        </Pressable>
        <Pressable
          style={styles.selectedDay}
          onPress={() =>
            saveExpense(
              category,
              price,
              email,
              selectedDay,
              setCategory,
              setPrice,
            )
          }>
          <Text style={styles.selectdaytext}>Save</Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedItem(null);
          }}>
          <ModalContent
            selectedItem={selectedItem}
            setSelectedDay={setSelectedDay}
            setModalVisible={setModalVisible}
          />
        </Modal>
      </ScrollView>
      <Image source={require('../assets/money.png')} style={styles.logoImage} />
    </>
  ) : (
    <Text style={styles.loginText}>You have to login</Text>
  );
};

export default AddExpenceScreen;
