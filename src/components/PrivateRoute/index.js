import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from '../../constant/routes';
import { useAuthContext } from '../../providers/AuthProvider';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? <Component {...props} /> : <Redirect to={routes.home.route} />;
      }}
    />
  );
}

export default PrivateRoute;
