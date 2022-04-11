import {Config} from '../../common';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Alert from '../Shared/Alert';

export const loginUser = (user, navigation) => {
  return dispatch => {
    dispatch({type: 'LOGIN_INPROGRESS'});
    axios
      .post(`${Config.apiUrl}/login`, user)
      .then(res => {
        AsyncStorage.setItem('isLoggedIn', 'true');
        AsyncStorage.setItem('token', res.data.token);
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data.data});
        navigation.navigate('App');
        Alert(res.data.message);
      })
      .catch(error => {
        dispatch({type: 'LOGIN_FAILURE', payload: error.response.data.message});
        Alert(error.response.data.message, true);
      });
  };
};

export const logoutUser = navigation => {
  AsyncStorage.removeItem('isLoggedIn');
  AsyncStorage.removeItem('token');
  navigation.navigate('Auth');
  Alert('Sucessfully logged out');

  return dispatch => {
    dispatch({type: 'LOGOUT_SUCCESS'});
  };
};

export const registerUser = (user, navigation) => {
  return dispatch => {
    dispatch({type: 'REGISTER_INPROGRESS'});
    axios
      .post(`${Config.apiUrl}/register`, user)
      .then(res => {
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: res.data.user,
          message: res.data.message,
        });
        navigation.navigate('Login');
        Alert(res.data.message);
      })
      .catch(error => {
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: error.response.data.message,
        });
        Alert(error.response.data.message, true);
      });
  };
};
