const initialState = {
  isLoading: false,
  error: false,
  message: '',
  balance: null,
  fetchWinnings: {
    loading: false,
    error: false,
    message: '',
    amount: null,
  },
  walletHistory: {
    loading: false,
    error: false,
    message: '',
    history: null,
  },
};

export default function WalletReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BALANCE_PENDING':
      return {...state, isLoading: true, error: false, message: ''};
    case 'FETCH_BALANCE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        message: '',
        balance: action.balance,
      };
    case 'FETCH_BALANCE_FAILURE':
      return {...state, isLoading: false, error: true, message: action.message};
    case 'FETCH_TOTALWINNING_PENDING':
      return {
        ...state,
        fetchWinnings: {loading: true, error: false, message: ''},
      };
    case 'FETCH_TOTALWINNING_SUCCESS':
      return {
        ...state,
        fetchWinnings: {
          loading: false,
          error: false,
          message: '',
          amount: action.amount,
        },
      };
    case 'FETCH_TOTALWINNING_FAILURE':
      return {
        ...state,
        fetchWinnings: {
          loading: false,
          error: true,
          message: action.message,
          amount: null,
        },
      };
    case 'FETCH_HISTORY_PENDING':
      return {
        ...state,
        walletHistory: {loading: true, error: false, message: ''},
      };
    case 'FETCH_HISTORY_SUCCESS':
      return {
        ...state,
        walletHistory: {
          loading: false,
          error: false,
          message: '',
          history: action.history,
        },
      };
    case 'FETCH_HISTORY_FAILURE':
      return {
        ...state,
        walletHistory: {
          loading: false,
          error: true,
          message: action.message,
          history: null,
        },
      };
    default:
      return {...state};
  }
}
