import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import strings from '../../constant/strings';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxWidth: '100%',
    margin: '2rem auto',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 'auto',
      height: '80%',
    },
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTypography-h2': {
      fontFamily: 'inherit',
      fontSize: '1.7rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '2.75rem',
      },
    },
    '& a': {
      background: theme.palette.secondary.main,
      padding: '0.8rem 1.2rem',
      maxWidth: '12rem',
      width: '100%',
      borderRadius: '2.5rem',
      fontFamily: 'inherit',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '1rem',
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
  },
  heroImg: {
    maxWidth: '90%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '60%',
    },
  },
  heroNotes: {
    margin: '2rem 0',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiTypography-h5': {
      fontFamily: 'inherit',
      fontSize: '1.15rem',
      margin: '0.4rem 0',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.25rem',
      },
    },
  },
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <Typography component="h2" variant="h2">
          {strings.APP_NAME}
        </Typography>
        <div className={classes.heroNotes}>
          <Typography component="h5" variant="h5">
            {strings.WORK_ANYWHERE}
          </Typography>

          <Typography component="h5" variant="h5">
            {strings.YOUR_NOTES}
          </Typography>

          <Typography component="h5" variant="h5">
            {strings.FIND_THINGS_FAST}
          </Typography>
        </div>
        <Link to={routes.signup.route}>{strings.SIGN_UP}</Link>
      </div>
      <img src="/images/note_banner.jpg" alt="hero" className={classes.heroImg} />
    </div>
  );
};

export default Hero;
