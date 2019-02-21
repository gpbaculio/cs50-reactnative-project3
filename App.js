import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';

import App from './components';

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
