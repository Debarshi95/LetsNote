import { Drawer, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Close, Menu } from '@material-ui/icons';
import routes from '../../constant/routes';

const useStyles = makeStyles((theme) => ({
  navbarRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 5rem',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '1.25rem 2rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    '& .userLinks, .noUserLinks': {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },

    '& .noUserLinks > a:nth-last-child(1)': {
      background: 'transparent',
      border: `2.5px solid ${theme.palette.background.paper}`,
      marginLeft: '20px',
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        border: 0,
        paddingBottom: '20px',
      },
    },

    '& .MuiDrawer-paper': {
      width: '100vw',
      position: 'static',
      padding: 0,
    },
    '& .MuiDrawer-paperAnchorDockedTop': {
      borderBottom: 0,
    },
  },
  navLinks: {
    display: 'block',
    padding: '10px 24px',
    color: '#fff',
    fontSize: '17px',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    borderRadius: '40px',
    [theme.breakpoints.down('xs')]: {
      color: theme.palette.primary.main,
      padding: '10px 16px',
    },
  },
  drawer: {
    background: ({ drawerOpen }) =>
      drawerOpen ? theme.palette.background.paper : theme.palette.primary.main,
  },
}));

function Navbar() {
  const xs = useMediaQuery('(max-width:600px)');
  const { user } = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const classes = useStyles({ drawerOpen });
  const links = (
    <>
      <Link to={routes.home.route} className={classes.navLinks}>
        LetsNote
      </Link>

      {user && (
        <div className="userLinks">
          <Link to={routes.notes.route} className={classes.navLinks}>
            Notes
          </Link>
        </div>
      )}
      {!user && (
        <div className="noUserLinks">
          <Link to={routes.signIn.route} className={classes.navLinks}>
            SignIn
          </Link>
          <Link to={routes.signUp.route} className={classes.navLinks}>
            SignUp
          </Link>
        </div>
      )}
    </>
  );
  return (
    <div className={classes.navbarRoot}>
      {xs ? (
        <div className={classes.drawer}>
          <IconButton onClick={() => setDrawerOpen((prev) => !prev)}>
            {drawerOpen ? <Close /> : <Menu />}
          </IconButton>
          <Drawer
            variant="persistent"
            anchor="top"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {drawerOpen && links}
          </Drawer>
        </div>
      ) : (
        <>{links}</>
      )}
    </div>
  );
}

export default Navbar;
