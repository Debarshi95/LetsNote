import {
  IconButton,
  ListItem,
  ListItemIcon,
  makeStyles,
  ListItemText,
  AppBar,
  Toolbar,
  Box,
  Drawer,
  Avatar,
  Typography,
  Divider,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import {
  AddOutlined,
  BookOutlined,
  DeleteOutlined,
  Menu,
  ExitToAppOutlined,
} from '@material-ui/icons';
import React, { useEffect, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import strings from '../../constant/strings';
import { useAuthContext } from '../../providers/AuthProvider';
import { getUserDataById } from '../../services';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2D2D2D',
    position: 'static',
    '& .MuiSvgIcon-root': {
      color: theme.palette.background.paper,
    },
    [theme.breakpoints.up('sm')]: {
      width: '16rem',
      position: 'sticky',
      top: 0,
      maxHeight: '100vh',
      padding: '1rem 0',
    },
    [theme.breakpoints.up('md')]: {
      width: '18rem',
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
    color: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
  },
  active: {
    backgroundColor: '#202020',
    color: theme.palette.text.secondary,
  },
  activeIconColor: {
    color: theme.palette.primary.main,
  },
}));

// Sidebar routes with title and respective icons
const sidebarRoutes = [
  { icon: <AddOutlined />, pathname: '/create', title: strings.CREATE_NOTE },
  { icon: <BookOutlined />, pathname: '/notes', title: strings.NOTES },
  { icon: <DeleteOutlined />, pathname: '/trash', title: strings.TRASH },
];

function Sidebar({ window }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();

  const { user } = useAuthContext();
  const sm = useMediaQuery('(min-width:600px)');

  const handleDrawerToggle = () => setOpen(!open);

  // MUI documentation styled guide for responsive drawer
  const container = window ? () => window().document.body : undefined;

  useEffect(() => {
    if (user?.uid) {
      getUserDataById(user.uid).then((res) => {
        setUserData({
          id: res.id,
          ...res.data(),
        });
      });
    }
  }, [user?.uid]);

  // Render List items
  const renderSidebarListItem = () => {
    return (
      <>
        <ListItem disableGutters>
          <ListItemIcon>
            <Avatar>{userData?.username?.split('')[0].toUpperCase()}</Avatar>
          </ListItemIcon>
          <Typography variant="h6">{userData?.username}</Typography>
        </ListItem>
        <Divider />

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
        <ListItem disableGutters>
          <Button>
            <ListItemIcon>
              <ExitToAppOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary={strings.SIGN_OUT} />
          </Button>
        </ListItem>
      </>
    );
  };

  // Render Sidebar Drawer based on viewport width
  const renderDrawer = () => {
    if (!sm) {
      return (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {renderSidebarListItem()}
        </Drawer>
      );
    }
    return <div>{renderSidebarListItem()}</div>;
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">{renderDrawer()}</Box>
    </div>
  );
}

export default memo(Sidebar);
