import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#3F3D56',
    marginBottom: 5,
    textAlign: 'center',
  },
  selectedDayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#3F3D56',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#3F3D56',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#6C63FF',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#6C63FF',
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#2598C1',
    fontWeight: 'bold',
  },
  loginText: {
    color: '#3F3D56',
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  selectedDay: {
    backgroundColor: '#6C63FF',
    borderRadius: 50,
    marginBottom: 10,
  },
  selectdaytext: {
    color: '#3F3D56',
    textAlign: 'center',
    fontSize: 20,
  },
  logoImage: {
    width: 400,

    height: 300,
  },
});
export default styles;
