import { makeStyles } from '@material-ui/core';
import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    minHeight: 'inherit',
    flex: 1,
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;
