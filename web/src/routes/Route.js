import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AppContainer from '../components/AppContainer';

import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  isAdminRestricted,
  path,
  exact,
}) {
  const { signed } = store.getState().auth;
  const { administrator } = store.getState().user;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    if (administrator) {
      return <Redirect to="/dashboard" />;
    }
    return <Redirect to="/home" />;
  }

  if (!administrator && isAdminRestricted) {
    return <Redirect to="/restricted" />;
  }

  const AppLayout = signed ? AppContainer : Fragment;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
        <AppLayout>
          <Component {...routeProps} />
        </AppLayout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isAdminRestricted: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  isAdminRestricted: false,
  exact: false,
};
