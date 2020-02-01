/* This component handles redirects for application errors
 */
import React, { Fragment } from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

export default function ApplicationErrorRedirect() {
  const applicationError = useSelector(state => state.applicationError);

  if (applicationError) {
    return (
      <Fragment>
        <Redirect
          to={{
            pathname: '/app-notice',
            state: { message: applicationError },
          }}
        />
      </Fragment>
    );
  }

  return <Fragment />;
}
