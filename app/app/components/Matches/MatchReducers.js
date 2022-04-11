const initialState = {
  isLoading: false,
  error: false,
  message: '',
  matches: null,
  livescore: {
    loading: false,
    error: false,
    message: '',
    score: null,
  },
};

export default function MatchReducers(state = initialState, action) {
  switch (action.type) {
    case 'MATCHS_FETCH_PENDING':
      return {...state, isLoading: true, error: false, message: ''};
    case 'MATCHS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        message: '',
        matches: action.payload,
      };
    case 'MATCHS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.message,
        matches: null,
      };
    case 'LIVESCORE_FETCH_PENDING':
      return {
        ...state,
        livescore: {loading: true, error: false, message: '', score: null},
      };
    case 'LIVESCORE_FETCH_SUCCESS':
      return {
        ...state,
        livescore: {
          loading: false,
          error: false,
          message: '',
          score: action.livescore,
        },
      };
    case 'LIVESCORE_FETCH_FAILURE':
      return {
        ...state,
        livescore: {
          loading: false,
          error: true,
          message: action.message,
          score: null,
        },
      };
    default:
      return {...state};
  }
}
