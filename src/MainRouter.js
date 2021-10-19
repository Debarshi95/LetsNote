import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute';
import * as ROUTES from './constant/routes';
import CreateNote from './pages/CreateNote';
import Trash from './pages/Trash';
import Notes from './pages/NoteList';
import EditNote from './pages/CreateNote';

const LazyHome = React.lazy(() => import('./pages/Home'));
const LazySignIn = React.lazy(() => import('./pages/SignIn'));
const LazySignUp = React.lazy(() => import('./pages/SignUp'));

function MainRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute path={ROUTES.NOTES} component={Notes} />
          <PrivateRoute path={ROUTES.CREATE_NOTE} component={CreateNote} />
          <PrivateRoute path={ROUTES.TRASH} component={Trash} />
          <PrivateRoute path={ROUTES.EDIT_NOTE} component={EditNote} />
          <Route exact path={ROUTES.HOME} component={LazyHome} />
          <Route path={ROUTES.SIGN_IN} component={LazySignIn} />
          <Route path={ROUTES.SIGN_UP} component={LazySignUp} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
