import React, { Suspense } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Loader from '../Loader';
import routeConfig from '../../utils/routeConfig';
import PrivateRoute from '../PrivateRoute';
import Sidebar from '../Sidebar';
import routes from '../../constant/routes';

function MainRouter() {
  return (
    <Router>
      <Route
        path={[routes.notes.route, routes.create.route, routes.trash.route, routes.edit.route]}
        component={Sidebar}
      />
      <Suspense fallback={<Loader />}>
        <Switch>
          {Object.keys(routeConfig).map((key) => {
            const Component = routeConfig[key].component;
            const isProtected = routeConfig[key].protected;
            if (isProtected) {
              return (
                <PrivateRoute
                  component={Component}
                  key={key}
                  exact={routeConfig[key].exact}
                  path={routeConfig[key].route}
                />
              );
            }
            return (
              <Route
                key={key}
                path={routeConfig[key].route}
                component={Component}
                exact={routeConfig[key].exact}
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default MainRouter;
