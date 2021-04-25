import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constant/routes";

const useStyles = makeStyles((theme) => ({
  navbarRoot: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem 3rem",

    "& > div > a": {
      margin: "0 1rem",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.navbarRoot}>
      <Link to={ROUTES.HOME}>LetsNote</Link>
      <div>
        <Link to={ROUTES.SIGN_IN}>SignIn</Link>
        <Link to={ROUTES.SIGN_UP}>SignUp</Link>
      </div>
    </div>
  );
}

export default Navbar;
