import {
  IconButton,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  AppBar,
  Toolbar,
  List,
} from '@material-ui/core';
import { AddOutlined, BookOutlined, Menu, ExitToAppOutlined } from '@material-ui/icons';
import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import strings from '../../constant/strings';
import { requestSignOut } from '../../store/slices/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'static',
    '& .MuiSvgIcon-root': {
      color: theme.palette.background.paper,
    },
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(34),
      position: 'sticky',
      height: '100vh',
      top: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
  },
  appbar: {
    backgroundColor: theme.palette.primary.contrastText,
    position: 'static',
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
}));

// Sidebar routes with title and respective icons
const sidebarRoutes = [
  { icon: <AddOutlined />, pathname: '/create', title: strings.CREATE_NOTE },
  { icon: <BookOutlined />, pathname: '/notes', title: strings.NOTES },
];

function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => setOpen(!open);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
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
    </div>
  );
}

export default memo(Sidebar);
