import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constant/routes";

const LazyHome = React.lazy(() => import("./pages/Home"));
const LazySignIn = React.lazy(() => import("./pages/SignIn"));
const LazySignUp = React.lazy(() => import("./pages/SignUp"));
const LazyDashboard = React.lazy(() => import("./pages/Dashboard"));

function MainRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loadding...</div>}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={LazyHome} />
          <Route path={ROUTES.SIGN_IN} component={LazySignIn} />
          <Route path={ROUTES.SIGN_UP} component={LazySignUp} />
          <Route path={ROUTES.USER} component={LazyDashboard} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
