import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store';
import App from './components/app';

// Uncomment to use mock middleware
// import { mockMiddleware } from './middleware/fetch-middleware';
// const store = configureStore(mockMiddleware);

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('react-root'),
);
