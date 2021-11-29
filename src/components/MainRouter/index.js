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
import UpdateNote from '../../pages/UpdateNote';
import NotFound from '../../pages/NotFound';

function MainRouter() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={routes.create.route} exact={routes.create.exact}>
            {isAuthenticated ? <CreateNote /> : <Redirect to={routes.home.route} />}
          </Route>
          <Route path={routes.edit.route} exact={routes.edit.exact}>
            {isAuthenticated ? <UpdateNote /> : <Redirect to={routes.home.route} />}
          </Route>
          <Route path={routes.notes.route} exact={routes.notes.exact}>
            {isAuthenticated ? <Notes /> : <Redirect to={routes.home.route} />}
          </Route>
          <Route path={routes.signin.route} exact={routes.signin.exact}>
            {!isAuthenticated ? <SignIn /> : <Redirect to={routes.notes.route} />}
          </Route>
          <Route path={routes.signup.route} exact={routes.signup.exact}>
            {!isAuthenticated ? <SignUp /> : <Redirect to={routes.notes.route} />}
          </Route>
          <Route path={routes.home.route} exact={routes.home.exact}>
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default MainRouter;
