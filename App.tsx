import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import MainNavigator from './src/Navigation/MainNavigator';
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
