import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import SnackbarProvider from './components/SnackbarProvider';

import { store, persistor } from './store';
import Routes from './routes';
import history from './services/history';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider />
        <Router history={history}>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
