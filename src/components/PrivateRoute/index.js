import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import routes from '../../constant/routes';
import { selectUser } from '../../features/userSlice';

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to={routes.home.route} />)}
    />
  );
}
const mapStateToProps = (state) => {
  console.log('MapStateToProps Called', { state });
  return { user: selectUser(state) };
};
export default connect(mapStateToProps, null)(PrivateRoute);
