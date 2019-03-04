import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';
import Reactotron from './ReactotronConfig';

export const store = Reactotron.createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
