import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../scss/main.scss';

// Components
import ErrorBoundary from './shared/error-boundary';
import ApplicationErrorRedirect from './shared/application-error-redirect';

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ApplicationErrorRedirect />
        <Route
          path={'/'}
          component={props => <div {...props}/>}
        />
        <Switch>
          <Route
            path={'/'}
            component={props => <div {...props}/>}
          />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
