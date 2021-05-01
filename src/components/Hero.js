import {
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constant/routes";

const useStyles = makeStyles((theme) => ({
  heroRoot: {
    display: "flex",
    width: "70%",
    margin: "6rem auto",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "3rem auto",
    },
  },
  hero: {
    flex: 1,
    margin: "2rem 0",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      alignItems: "center",
    },

    "& .MuiTypography-h2": {
      fontFamily: "inherit",
      [theme.breakpoints.down("xs")]: {
        fontSize: "26px",
      },
    },
    "& a": {
      background: theme.palette.secondary.main,
      padding: "14px 18px",
      width: "190px",
      borderRadius: "40px",
      fontFamily: "inherit",
      fontWeight: 600,
      display: "flex",
      justifyContent: "center",
      marginLeft: "1rem",
    },
  },
  heroImg: {
    flex: 1,
    width: "100%",
  },
  heroNotes: {
    margin: "2rem 0",
    fontFamily: "inherit",
  },
}));
function Hero() {
  const classes = useStyles();
  return (
    <div className={classes.heroRoot}>
      <div className={classes.hero}>
        <Typography component="h2" variant="h2">
          LetsNote
        </Typography>
        <div className={classes.heroNotes}>
          <ListItem disableGutters>
            <ListItemIcon>
              <FiberManualRecord />
            </ListItemIcon>
            <Typography component="h5" variant="h5">
              Work anywhere
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <FiberManualRecord />
            </ListItemIcon>
            <Typography component="h5" variant="h5">
              Your notes, your way
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon>
              <FiberManualRecord />
            </ListItemIcon>
            <Typography component="h5" variant="h5">
              Find things fast
            </Typography>
          </ListItem>
        </div>
        <Link to={ROUTES.SIGN_UP}>SIGN UP</Link>
      </div>
      <img
        src="/images/note_banner.jpg"
        alt="hero"
        className={classes.heroImg}
      />
    </div>
  );
}

export default Hero;
