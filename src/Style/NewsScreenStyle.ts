import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  error: {
    color: 'red',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paginationText: {
    fontSize: 16,
    color: 'blue',
  },
});
export default styles;
