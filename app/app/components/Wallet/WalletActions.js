import axios from 'axios';
import {Config} from '../../common';

export const fetchBalance = () => {
  return async dispatch => {
    dispatch({type: 'FETCH_BALANCE_PENDING'});

    await axios
      .get(`${Config.apiUrl}/wallet/balance`)
      .then(res => {
        dispatch({type: 'FETCH_BALANCE_SUCCESS', balance: res.data.balance});
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_BALANCE_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};

export const fetchTotalWinnings = () => {
  return async dispatch => {
    dispatch({type: 'FETCH_TOTALWINNING_PENDING'});

    await axios
      .get(`${Config.apiUrl}/wallet/winnings`)
      .then(res => {
        dispatch({
          type: 'FETCH_TOTALWINNING_SUCCESS',
          amount: res.data.amount,
        });
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_TOTALWINNING_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};

export const fetchHistory = () => {
  return async dispatch => {
    dispatch({type: 'FETCH_HISTORY_PENDING'});

    await axios
      .get(`${Config.apiUrl}/wallet/history`)
      .then(res => {
        dispatch({
          type: 'FETCH_HISTORY_SUCCESS',
          history: res.data.history,
        });
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_HISTORY_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};
