import { AsyncStorage } from 'react-native';

export const onSignIn = token => AsyncStorage.setItem('token', token);

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(USER_KEY);
  if (token) {
    return true;
  } else {
    return false;
  }
};
