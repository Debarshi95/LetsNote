import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constant/routes";

const useStyles = makeStyles((theme) => ({
  heroRoot: {
    width: "70%",
    margin: "3rem auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroTitle: {
    textAlign: "center",
    fontSize: "48px",
    margin: "6px 0",
  },
  heroMessage: {
    fontSize: "26px",
    fontWeight: 400,
    textAlign: "center",
  },

  heroBtnLink: {
    padding: "1rem 5rem",
    background: theme.palette.primary.main,
    borderRadius: "2px",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    margin: "1.5rem 0",
  },
  heroAccount: {
    fontSize: "18px",
    fontWeight: 400,
  },
  heroDetails: {
    display: "flex",
    height: 300,
    alignItems: "center",

    "& > div": {
      margin: "1rem",
    },

    "& > div> h2, p": {
      textAlign: "center",
    },
  },
}));

function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.heroRoot}>
      <h1 className={classes.heroTitle}>Accomplish more with better notes</h1>
      <h3 className={classes.heroMessage}>
        LetsNote helps you capture ideas and find them fast.
      </h3>
      <Link to={ROUTES.HOME} className={classes.heroBtnLink}>
        Sign up for free
      </Link>
      <h4 className={classes.heroAccount}>
        Have an account? <Link to={ROUTES.SIGN_IN}>Log in</Link>
      </h4>

      <div className={classes.heroDetails}>
        <div>
          <h2>WORK ANYWHERE</h2>
          <p>
            Keep important info handy by syncing your notes to all your devices
          </p>
        </div>
        <div>
          <h2> YOUR NOTES, YOUR WAY</h2>
          <p>
            Express yourself with formatting tools that help you write how you
            think.
          </p>
        </div>
        <div>
          <h2>FIND THINGS FAST</h2>
          <p>
            Get what you need, when you need it. Search gives you results as you
            type.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
