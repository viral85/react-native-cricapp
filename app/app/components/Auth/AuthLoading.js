import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from '../../common';

const {width} = Dimensions.get('window');
class AuthLoading extends Component {
  componentDidMount() {
    this.getStatus();
  }

  getStatus = async () => {
    const loginStatus = await AsyncStorage.getItem('isLoggedIn');

    if (loginStatus === null) {
      this.props.navigation.navigate('Auth');
      return false;
    } else {
      this.props.navigation.navigate('App');
      return true;
    }
  };
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Image style={styles.logo} source={require('../../images/logo.png')} />
        {/* <Text style={styles.logoText}>Cric App</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Config.primaryColor,
  },
  logo: {
    width: width / 1.8,
    height: width / 1.8,
  },
  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  logoImage: {width: 100, height: 100},
});

export default AuthLoading;
