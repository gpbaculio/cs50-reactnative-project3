import {
  LOGOUT_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../types';

const initialState = {
  id: 0,
  email: '',
  token: '',
  loading: false,
  error: ''
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        loading: false
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case LOGOUT_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default user;
