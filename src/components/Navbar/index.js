import React from 'react';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../../utils/routes';
import strings from '../../constant/strings';
import NavDrawer from '../NavDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.secondary.main,
    width: '100%',
    position: 'relative',
  },
  navContainer: {
    maxWidth: '100%',
    display: 'flex',
    margin: '0 auto',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: '0.75rem 0',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '75%',
    },
    '& a': {
      textDecoration: 'none',
      display: 'block',
      fontSize: '0.875rem',
      fontFamily: 'inherit',
      fontWeight: 600,
      color: theme.palette.text.secondary,
      [theme.breakpoints.up('sm')]: {
        padding: '0.5rem 1.4rem',
        fontSize: theme.spacing(1.8),
        color: theme.palette.background.default,
      },
      [theme.breakpoints.up('md')]: {
        fontSize: theme.spacing(2),
      },
    },
  },
  navLink: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const xs = useMediaQuery('(max-width:600px)');

  const navLinks = (
    <>
      <Link to={routes.home.route} className={classes.navLinks}>
        {strings.APP_NAME}
      </Link>
      {isAuthenticated ? (
        <div className={classes.navLink}>
          <Link to={routes.notes.route}>{strings.NOTES}</Link>
        </div>
      ) : (
        <div className={classes.navLink}>
          <Link to={routes.signin.route}>{strings.SIGN_IN}</Link>
          <Link to={routes.signup.route}>{strings.SIGN_UP}</Link>
        </div>
      )}
    </>
  );

  return (
    <nav className={classes.root}>
      <div className={classes.navContainer}>
        {xs ? <NavDrawer>{navLinks}</NavDrawer> : navLinks}
      </div>
    </nav>
  );
};

export default Navbar;
