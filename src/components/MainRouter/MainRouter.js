import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from '../Loader';
import PrivateRoute from '../PrivateRoute';
import routeConfig from '../../utils/routeConfig';

function MainRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          {Object.keys(routeConfig).map((key) => {
            const Component = routeConfig[key].component;
            const isProtected = routeConfig[key].protected;
            if (isProtected) {
              return (
                <PrivateRoute
                  key={key}
                  path={routeConfig[key].route}
                  exact={routeConfig[key].exact}
                  component={Component}
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
    </BrowserRouter>
  );
}

export default MainRouter;
