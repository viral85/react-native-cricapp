import axios from 'axios';
import {Config} from '../../common';

export const fetchProfile = () => {
  return async dispatch => {
    dispatch({type: 'PROFILE_FETCH_PENDING'});
    await axios
      .get(`${Config.apiUrl}/user/profile`)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: 'PROFILE_FETCH_SUCCESS',
            user: res.data.user,
            info: res.data.info,
          });
        } else {
          dispatch({type: 'PROFILE_FETCH_FAILURE', message: res.data.message});
        }
      })
      .catch(error => {
        dispatch({
          type: 'PROFILE_FETCH_FAILURE',
          user: error.response.data.message,
        });
      });
  };
};
