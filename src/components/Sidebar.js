import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  makeStyles,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { AddRounded, DeleteSharp, NotesSharp, Menu, ExitToAppOutlined } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setNotesEmpty } from '../features/notesSlice';
import { getUserDataById } from '../features/userSlice';
import { auth } from '../firebase';
import * as ROUTES from '../constant/routes';

const useStyles = makeStyles({
  sidebarRoot: {
    width: '320px',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    background: '#1a1a1a',
    height: '100vh',
    position: 'sticky',
    top: 0,
    color: '#bdbdbd',

    '& .MuiSvgIcon-root': {
      color: '#bdbdbd',
    },
  },
  active: {
    backgroundColor: 'red',
  },
});

const listItems = [
  { icon: <AddRounded />, to: ROUTES.CREATE_NOTE, text: 'New Note' },
  { icon: <NotesSharp />, to: ROUTES.NOTES, text: 'Notes' },
  { icon: <DeleteSharp />, to: ROUTES.TRASH, text: 'Trash' },
];

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const sm = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getUserDataById(user.uid)).catch((err) => console.log(err));
  }, [user.uid, dispatch]);

  const sideBarItems = (
    <>
      <ListItem className={classes.userInfo}>
        <ListItemIcon>
          <Avatar>{user?.username?.split('')[0]}</Avatar>
        </ListItemIcon>
        <Typography variant="h6">{user?.username}</Typography>
      </ListItem>
      <Divider />
      {listItems.map((item) => (
        <ListItem key={item.text}>
          <NavLink
            to={item.to}
            style={{ display: 'contents', textDecoration: 'none' }}
            activeClassName={classes.active}
          >
            <Button
              fullWidth
              startIcon={item.icon}
              style={{
                color: `${sm ? '#000' : '#bdbdbd'}`,
                textTransform: 'initial',
                display: 'flex',
                justifyContent: 'start',
                fontSize: '16px',
                fontFamily: 'inherit',
                fontWeight: 'bold',
              }}
            >
              {item.text}
            </Button>
          </NavLink>
        </ListItem>
      ))}
      <ListItem>
        <Button
          fullWidth
          onClick={() => {
            dispatch(setNotesEmpty());
            auth.signOut();
          }}
          startIcon={<ExitToAppOutlined />}
          style={{
            color: `${sm ? '#000' : '#bdbdbd'}`,
            textTransform: 'initial',
            display: 'flex',
            justifyContent: 'start',
            fontSize: '16px',
            fontFamily: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Logout
        </Button>
      </ListItem>
    </>
  );
  return (
    <>
      {sm ? (
        <>
          <div>
            <IconButton onClick={() => setOpen(!open)}>
              <Menu />
            </IconButton>
          </div>
          <SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
            {sideBarItems}
          </SwipeableDrawer>
        </>
      ) : (
        <div className={classes.sidebarRoot}>{sideBarItems}</div>
      )}
    </>
  );
}

export default Sidebar;
