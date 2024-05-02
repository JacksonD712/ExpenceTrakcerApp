import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // sky-300 color
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  text: {
    color: 'black', // Set text color to black
  },
  selectedDay: {
    backgroundColor: 'yellow',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
  },
  modalContent: {
    backgroundColor: '#6C63FF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  selectedDayText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  expensesContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  expensesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expense: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  showdaystext: {
    backgroundColor: '#6C63FF',
    textAlign: 'center',
  },
  logoImage: {
    width: 400,
    marginTop: 60,
    height: 300,
  },
});
export default styles;
