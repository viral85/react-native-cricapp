import axios from 'axios';
import {Config} from '../../common';
import {Alert} from 'react-native';

export const getBets = () => {
  return async dispatch => {
    dispatch({type: 'MYBETS_FETCH_PENDING'});
    await axios
      .get(`${Config.apiUrl}/bet`)
      .then(res => {
        if (res.data.success === true) {
          dispatch({type: 'MYBETS_FETCH_SUCCESS', bets: res.data.bets});
        } else {
          dispatch({type: 'MYBETS_FETCH_FAILURE'});
        }
      })
      .catch(err => {
        dispatch({
          type: 'MYBETS_FETCH_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};

export const getBetsByMatch = id => {
  return dispatch => {
    dispatch({type: 'BETS_BY_MATCH_FETCH_PENDING'});
    axios
      .get(`${Config.apiUrl}/bet/match/${id}`)
      .then(res => {
        // console.log(res);
        if (res.data.success === true) {
          dispatch({
            type: 'BETS_BY_MATCH_FETCH_SUCCESS',
            bets: res.data.bets,
          });
        } else {
          dispatch({type: 'BETS_BY_MATCH_FETCH_FAILURE'});
        }
      })
      .catch(err => {
        dispatch({
          type: 'BETS_BY_MATCH_FETCH_FAILURE',
          payload: err.response.data,
        });
      });
  };
};

export const placeBet = bet => {
  return dispatch => {
    dispatch({type: 'PLACE_BET_PENDING'});
    axios
      .post(`${Config.apiUrl}/bet`, bet)
      .then(res => {
        if (res.data.success === true) {
          dispatch({type: 'PLACE_BET_SUCCESS'});
          dispatch(getBetsByMatch(bet.match_id));
          Alert.alert('Success', res.data.message);
        } else {
          dispatch({type: 'PLACE_BET_FAILURE'});
          Alert.alert('Error', res.data.message);
        }
      })
      .catch(err => {
        dispatch({
          type: 'PLACE_BET_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};
