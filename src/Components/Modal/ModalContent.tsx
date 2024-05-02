import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../Style/AddExpenceStyle';

interface Props {
  selectedItem: any;
  setSelectedDay: (day: number | null) => void;
  setModalVisible: (visible: boolean) => void;
}

const ModalContent: React.FC<Props> = ({
  selectedItem,
  setSelectedDay,
  setModalVisible,
}) => {
  if (!selectedItem) return null;

  const days = [];
  for (let i = 1; i <= selectedItem.time; i++) {
    days.push(
      <TouchableOpacity
        key={i}
        style={styles.modalButton}
        onPress={() => {
          setSelectedDay(i);
          setModalVisible(false);
        }}>
        <Text style={styles.modalButtonText}>Day {i}</Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Select Day</Text>
      {days}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          setModalVisible(false);
        }}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalContent;
