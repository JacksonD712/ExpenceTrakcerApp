import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F3D56',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  userContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#3F3D56',
  },
  loginText: {
    fontSize: 20,
    color: '#3F3D56',
  },
  tet: {
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 10,
    fontSize: 20,
  },
  logoImage: {
    width: 300,
    marginTop: 30,
    height: 300,
  },
});
export default styles;
