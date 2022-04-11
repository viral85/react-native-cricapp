import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {View, StyleSheet, StatusBar} from 'react-native';
import RootRouter from './app/navigation/RootRouter';
import {Provider} from 'react-redux';
import {store, persistor} from './app/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Config} from './app/common';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <>
            <StatusBar
              backgroundColor={Config.primaryColor}
              barStyle="light-content"
            />
            <View style={styles.appContainer}>
              <RootRouter />
            </View>
          </>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default App;
