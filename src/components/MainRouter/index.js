import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import routes from '../../utils/routes';
import Home from '../../pages/Home/Loadable';
import SignIn from '../../pages/SignIn/Loadable';
import SignUp from '../../pages/SignUp/Loadable';
import Notes from '../../pages/Notes/Loadable';
import CreateNote from '../../pages/CreateNote/Loadable';

function MainRouter() {
  const { isAuthenticated } = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Route path={routes.home.route} exact={routes.home.exact}>
          <Home />
        </Route>
        <Switch>
          <Route path={routes.signin.route} exact={routes.signin.exact}>
            {isAuthenticated ? <Redirect to={routes.notes.route} /> : <SignIn />}
          </Route>
          <Route path={routes.signup.route} exact={routes.signup.exact}>
            {isAuthenticated ? <Redirect to={routes.notes.route} /> : <SignUp />}
          </Route>
          {isAuthenticated ? (
            <>
              <Route path={routes.notes.route} exact={routes.notes.exact} component={Notes} />
              <Route path={routes.create.route} exact={routes.notes.exact} component={CreateNote} />
            </>
          ) : (
            <Redirect to={routes.home.route} />
          )}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default MainRouter;
