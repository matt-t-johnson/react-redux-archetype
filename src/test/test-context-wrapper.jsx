import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from '../store';

const store = configureStore();

/*
 * A component that wraps testable components with the redux, and react-router providers.
 * The redux store defaults to an empty store but can be overwritten as needed by specifying a mockStore
 * to pass in from a test file that needs to dispatch actions or modify store properties.
 */
const ReduxTestContext = props => (
  <ReduxProvider store={props.mockStore || store}>
    <MemoryRouter>
      {props.children}
    </MemoryRouter>
  </ReduxProvider>
);

ReduxTestContext.propTypes = {
  children: PropTypes.any,
  mockStore: PropTypes.any,
};

export default ReduxTestContext;
