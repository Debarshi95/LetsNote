import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import * as ROUTES from "./constant/routes";

const LazyHome = React.lazy(() => import("./pages/Home"));
const LazySignIn = React.lazy(() => import("./pages/SignIn"));
const LazySignUp = React.lazy(() => import("./pages/SignUp"));
const LazyNewNote = React.lazy(() => import("./pages/NewNote"));
const LazyNoteList = React.lazy(() => import("./pages/NoteList"));
const LazyTrash = React.lazy(() => import("./pages/Trash"));

function MainRouter() {
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
          <PrivateRoute path={ROUTES.NOTES} component={LazyNoteList} />
          <PrivateRoute path={ROUTES.CREATENOTE} component={LazyNewNote} />
          <PrivateRoute path={ROUTES.TRASH} component={LazyTrash} />
          <Route exact path={ROUTES.HOME} component={LazyHome} />
          <Route path={ROUTES.SIGN_IN} component={LazySignIn} />
          <Route path={ROUTES.SIGN_UP} component={LazySignUp} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
