const initialState = {
  loading: false,
  error: false,
  message: '',
  user: null,
  info: null,
};

export default function ProfileReducers(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_FETCH_PENDING':
      return {
        ...state,
        loading: true,
        error: null,
        message: '',
        user: null,
        info: null,
      };
    case 'PROFILE_FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: '',
        user: action.user,
        info: action.info,
      };
    case 'PROFILE_FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
        user: null,
        info: null,
      };
    default:
      return {...state};
  }
}
