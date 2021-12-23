import { makeStyles } from '@material-ui/core';
import React from 'react';
import Hero from '../../components/Hero';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: '100vh',
    overflow: 'hidden scroll',
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
