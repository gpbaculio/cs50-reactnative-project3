import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './components';

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
