import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constant/routes";
import { selectUser } from "./features/userSlice";

const LazyHome = React.lazy(() => import("./pages/Home"));
const LazySignIn = React.lazy(() => import("./pages/SignIn"));
const LazySignUp = React.lazy(() => import("./pages/SignUp"));
const LazyDashboard = React.lazy(() => import("./pages/Dashboard"));

function MainRouter() {
  const { user } = useSelector(selectUser);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <CircularProgress color="primary" />
          </div>
        }
      >
        <Switch>
          <Route exact path={ROUTES.HOME} component={LazyHome} />
          <Route path={ROUTES.SIGN_IN} component={LazySignIn} />
          <Route path={ROUTES.SIGN_UP} component={LazySignUp} />
          <Route
            path={ROUTES.DASHBOARD}
            render={() =>
              user ? <LazyDashboard /> : <Redirect to={ROUTES.HOME} />
            }
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
