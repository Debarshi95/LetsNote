import { Drawer, IconButton, makeStyles } from '@material-ui/core';
import { Close, Menu } from '@material-ui/icons';
import React, { memo, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDrawer-docked': {
      position: 'absolute',
      padding: 0,
      width: '100%',
    },
    '& .MuiDrawer-paper': {
      position: 'static',
      background: theme.palette.secondary.main,
    },
    '& a': {
      padding: '0.7rem 1rem',
    },
    '& .MuiDrawer-paperAnchorTop': {
      top: '3rem',
    },
  },
}));

const NavDrawer = ({ orientation, children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open, orientation });

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <IconButton onClick={toggleDrawer} color="secondary">
        {open ? <Close /> : <Menu />}
      </IconButton>
      <Drawer variant="persistent" anchor="top" open={open} onClose={toggleDrawer}>
        {children}
      </Drawer>
    </div>
  );
};

export default memo(NavDrawer);
