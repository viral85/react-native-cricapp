import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Config} from './common';

const axiosInterceptors = axios.create({
  baseURL: Config.apiUrl,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer',
  },
});

axiosInterceptors.interceptors.request.use(async function(config) {
  axios.defaults.timeout = 1000;
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = 'Bearer '.concat(token);
  return config;
});

axiosInterceptors.interceptors.response.use(
  function onSuccess(response) {
    return response.data;
  },
  function onError(error) {
    if (error.response.status === 401 || error.status === 401) {
      AsyncStorage.removeItem('isLoggedIn');
      AsyncStorage.removeItem('token');
    } else {
    }

    return Promise.reject(error);
  },
);

export default axiosInterceptors;
