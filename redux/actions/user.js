import { AsyncStorage } from 'react-native';
import {
  LOGOUT_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../types';

export default {
  login: ({ email, password }) => async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(async ({ token }) => {
        const payload = { id: 1, email };
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(payload));
        dispatch({ type: LOGIN_SUCCESS, payload });
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAILED, payload: { error } });
      });
  },
  persistUser: payload => async dispatch => {
    dispatch({ type: LOGIN_SUCCESS, payload });
  },
  logout: () => dispatch => {
    dispatch({ type: LOGOUT_USER });
  }
};
