import { combineReducers } from 'redux';
import user from './user';
import todos from './todos';

export default combineReducers({
  user,
  todos
});
