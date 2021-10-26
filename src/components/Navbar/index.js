import { Drawer, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Close, Menu } from '@material-ui/icons';
import routes from '../../constant/routes';
import strings from '../../constant/strings';
import { useAuthContext } from '../../providers/AuthProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.35rem 2.5rem',
    },
    [theme.breakpoints.up('md')]: {
      width: '80%',
      margin: 'auto',
    },
    '& .MuiDrawer-paper': {
      position: 'static',
      padding: 0,
    },
    '& .MuiDrawer-paperAnchorDockedTop': {
      borderBottom: 0,
    },
  },
  linkWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    '& > a:nth-last-child(1)': {
      border: 0,
      paddingBottom: '1.25rem',
      [theme.breakpoints.up('sm')]: {
        background: 'transparent',
        border: `2.5px solid ${theme.palette.background.paper}`,
        paddingBottom: '0.8rem',
        marginLeft: '1.75rem',
      },
    },
  },

  navLinks: {
    display: 'block',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    padding: '0.4rem 1rem',
    color: theme.palette.primary.main,

    [theme.breakpoints.up('sm')]: {
      padding: '0.5rem 1.4rem',
      fontSize: '0.975rem',
      color: theme.palette.background.default,
      borderRadius: '2.8rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.05rem',
    },
  },
  drawer: {
    width: '100%',
    background: ({ drawerOpen }) =>
      drawerOpen ? theme.palette.background.paper : theme.palette.primary.main,
  },
}));

function Navbar() {
  const xs = useMediaQuery('(max-width:600px)');
  const { isAuthenticated } = useAuthContext();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const classes = useStyles({ drawerOpen });

  // Function to render private/public links based on auth state
  const renderLinks = () => {
    return (
      <>
        <Link to={routes.home.route} className={classes.navLinks}>
          {strings.APP_NAME}
        </Link>
        {isAuthenticated ? (
          <div className={classes.linkWrapper}>
            <Link to={routes.notes.route} className={classes.navLinks}>
              {strings.NOTES}
            </Link>
          </div>
        ) : (
          <div className={classes.linkWrapper}>
            <Link to={routes.signIn.route} className={classes.navLinks}>
              {strings.SIGN_IN}
            </Link>
            <Link to={routes.signUp.route} className={classes.navLinks}>
              {strings.SIGN_UP}
            </Link>
          </div>
        )}
      </>
    );
  };

  // Function to render drawer/navbar based on viewport width(responsive)
  const renderDrawer = () => {
    if (xs) {
      return (
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
            {drawerOpen && renderLinks()}
          </Drawer>
        </div>
      );
    }
    return renderLinks();
  };

  return <div className={classes.root}>{renderDrawer()}</div>;
}

export default Navbar;
