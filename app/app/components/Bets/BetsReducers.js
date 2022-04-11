const initialState = {
  isLoading: false,
  error: false,
  message: '',
  bets: null,
  getBetsByMatch: {
    loading: false,
    bets: null,
    error: false,
    message: '',
  },
  placeBet: {
    loading: false,
    bet: null,
    error: false,
    message: '',
  },
};

export default function BetsReducers(state = initialState, action) {
  switch (action.type) {
    case 'MYBETS_FETCH_PENDING':
      return {...state, isLoading: true, error: false, message: ''};
    case 'MYBETS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        message: '',
        bets: action.bets,
      };
    case 'MYBETS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.message,
        bets: null,
      };
    case 'BETS_BY_MATCH_FETCH_PENDING':
      return {
        ...state,
        getBetsByMatch: {loading: true, error: false, message: ''},
      };
    case 'BETS_BY_MATCH_FETCH_SUCCESS':
      return {
        ...state,
        getBetsByMatch: {
          loading: false,
          error: false,
          message: '',
          bets: action.bets,
        },
      };
    case 'BETS_BY_MATCH_FETCH_FAILURE':
      return {
        ...state,
        getBetsByMatch: {loading: false, error: true, message: action.message},
      };
    case 'PLACE_BET_PENDING':
      return {
        ...state,
        placeBet: {loading: true, error: false, message: '', bet: null},
      };
    case 'PLACE_BET_SUCCESS':
      return {
        ...state,
        placeBet: {loading: false, error: false, message: '', bet: action.bet},
      };
    case 'PLACE_BET_FAILURE':
      return {
        ...state,
        placeBet: {
          loading: false,
          error: true,
          message: action.message,
          bet: null,
        },
      };
    default:
      return {...state};
  }
}
