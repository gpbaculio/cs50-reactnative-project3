import { AsyncStorage } from 'react-native';
import {
  LOGOUT_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../types';

export default {
  login: ({ email, password }) => async (dispatch, getState) => {
    console.log('fired action!');
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
      .then(({ token }) => {
        console.log('token', token);
        AsyncStorage.setItem('token', token);
        dispatch({ type: LOGIN_SUCCESS, payload: { id: 1, token, email } });
      })
      .catch(error => {
        console.log('error', error);
        dispatch({ type: LOGIN_FAILED, payload: { error } });
      });
  },
  logout: () => {
    dispatch({ type: LOGOUT_USER });
  }
};
