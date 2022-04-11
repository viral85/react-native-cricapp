import axios from 'axios';
import {Config} from '../../common';

export const fetchMatches = () => {
  const startDate = new Date().toJSON().slice(0, 10);
  const oneWeek = new Date(startDate).getDate() + 7;
  const endOn = new Date().setDate(oneWeek);
  const endDate = new Date(endOn).toJSON().slice(0, 10);

  return async dispatch => {
    dispatch({type: 'MATCHS_FETCH_PENDING'});

    await axios
      .get(
        `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${
          Config.apiKey
        }&filter[starts_between]=${startDate},${endDate}&include=localteam,visitorteam,league&sort=starting_at`,
      )
      .then(res => {
        // console.log();
        dispatch({type: 'MATCHS_FETCH_SUCCESS', payload: res.data.data});
      })
      .catch(err => {
        dispatch({
          type: 'MATCHS_FETCH_FAILURE',
          message: err.response,
        });
      });
  };
};

export const getLiveScore = (match_id, status) => {
  return dispatch => {
    dispatch({type: 'LIVESCORE_FETCH_PENDING'});
    axios
      .get(
        `https://cricket.sportmonks.com/api/v2.0/${
          status === 'Finished' ? 'fixtures' : 'livescores'
        }/${match_id}?api_token=ArAX5LcbCkLst7I0uqZRiypcFYnXUHbc8JfVefHkqZlAs3vw3TaMx5MP74nW&include=batting.batsman,batting.catchstump,batting.bowler,bowling.bowler,runs,odds,scoreboards,localteam,visitorteam`,
      )
      .then(res => {
        if (res.data.status === 'error') {
          dispatch({
            type: 'LIVESCORE_FETCH_FAILURE',
            message: res.data.message.message,
          });
        }
        dispatch({type: 'LIVESCORE_FETCH_SUCCESS', livescore: res.data.data});
      })
      .catch(err => {
        dispatch({
          type: 'LIVESCORE_FETCH_FAILURE',
          message: err.response.data.message.message,
        });
      });
  };
};
