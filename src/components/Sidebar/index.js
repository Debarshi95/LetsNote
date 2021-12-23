import React, { memo, useState, useRef } from 'react';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  AppBar,
  Toolbar,
  List,
  useMediaQuery,
  Drawer,
} from '@material-ui/core';
import { AddOutlined, BookOutlined, Menu, ExitToAppOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import strings from '../../constant/strings';
import { requestSignOut } from '../../store/slices/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.background.paper,
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(34),
      position: 'sticky',
      maxHeight: '100vh',
      top: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
  },
  appbar: {
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sidebarLinks: {
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    textDecoration: 'none',
    cursor: 'pointer',
    fontWeight: 600,
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0.2),
  },
  drawer: {
    width: '70%',
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
      padding: '1rem',
    },
  },
}));

// Sidebar routes with title and respective icons
const sidebarRoutes = [
  { icon: <AddOutlined />, pathname: '/create', title: strings.CREATE_NOTE },
  { icon: <BookOutlined />, pathname: '/notes', title: strings.NOTES },
];

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const containerRef = useRef();
  const sm = useMediaQuery('(min-width:600px)');

  const handleDrawerToggle = () => setOpen(!open);

  const list = (
    <List>
      {sidebarRoutes.map((route) => (
        <ListItem key={route.title} disableGutters>
          <NavLink
            to={route.pathname}
            key={route.title}
            activeClassName={classes.active}
            className={classes.sidebarLinks}
          >
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.title} />
          </NavLink>
        </ListItem>
      ))}
      <ListItem
        disableGutters
        className={classes.sidebarLinks}
        onClick={() => dispatch(requestSignOut())}
      >
        <ListItemIcon>
          <ExitToAppOutlined />
        </ListItemIcon>
        <ListItemText primary={strings.SIGN_OUT} />
      </ListItem>
    </List>
  );

  return (
    <div className={classes.root} ref={containerRef}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      {sm ? (
        <>{list}</>
      ) : (
        <Drawer
          open={open}
          className={classes.drawer}
          onClose={handleDrawerToggle}
          container={containerRef.current}
        >
          {list}
        </Drawer>
      )}
    </div>
  );
};

export default memo(Sidebar);
