const initialState = {
  isInprogress: false,
  isError: false,
  message: '',
  isLoggedIn: false,
  user: null,
  registerUser: {
    loading: false,
    data: '',
    error: '',
    message: '',
  },
};

export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_INPROGRESS':
      return {...state, isInprogress: true, isError: false, message: ''};
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isInprogress: false,
        isError: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isInprogress: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        user: null,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isInprogress: false,
        isError: false,
        message: '',
        isLoggedIn: false,
        user: null,
      };
    case 'REGISTER_INPROGRESS':
      return {
        ...state,
        registerUser: {loading: true, error: '', data: '', message: ''},
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        registerUser: {
          loading: false,
          error: '',
          data: action.payload,
          message: action.message,
        },
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        registerUser: {
          loading: false,
          error: action.payload,
          data: '',
          message: '',
        },
      };
    default:
      return {...state};
  }
}
