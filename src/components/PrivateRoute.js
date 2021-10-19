import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useSelector((state) => state.user);
  return (
    <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect to="/" />)} />
  );
}

export default PrivateRoute;
