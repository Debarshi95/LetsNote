import { makeStyles } from "@material-ui/core";
import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  homeRoot: {
    background: theme.palette.primary.main,
    minHeight: "100vh",
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <div className={classes.homeRoot}>
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
