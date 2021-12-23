import { makeStyles } from '@material-ui/core';
import React from 'react';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    height: '80vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.container}>
        <h2>404 | Page not found</h2>
      </div>
    </div>
  );
};

export default NotFound;
