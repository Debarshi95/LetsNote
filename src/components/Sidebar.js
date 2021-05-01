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
} from "@material-ui/core";
import {
  AddRounded,
  DeleteSharp,
  NotesSharp,
  Menu,
  ExitToAppOutlined,
} from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setNotesEmpty } from "../features/notesSlice";
import { auth } from "../firebase";

const useStyles = makeStyles({
  sidebarRoot: {
    width: "320px",
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    background: "#1a1a1a",
    height: "100vh",
    position: "sticky",
    top: 0,
    color: "#bdbdbd",

    "& .MuiSvgIcon-root": {
      color: "#bdbdbd",
    },
  },
});

const listItems = [
  { icon: <AddRounded />, text: "New Note" },
  { icon: <NotesSharp />, text: "Notes" },
  { icon: <DeleteSharp />, text: "Trash" },
];

function Sidebar({ handleComponentSelection }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const sm = useMediaQuery("(max-width:600px)");
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const sideBarItems = (
    <>
      <ListItem className={classes.userInfo}>
        <ListItemIcon>
          <Avatar>{user?.fullname?.split("")[0]}</Avatar>
        </ListItemIcon>
        <Typography variant="h6">{user?.fullname?.split(" ")[0]}</Typography>
      </ListItem>
      <Divider />
      {listItems.map((item) => (
        <ListItem key={item.text}>
          <Button
            fullWidth
            startIcon={item.icon}
            onClick={() => handleComponentSelection(item.text)}
            style={{
              color: `${sm ? "#000" : "#bdbdbd"}`,
              textTransform: "initial",
              display: "flex",
              justifyContent: "start",
              fontSize: "16px",
              fontFamily: "inherit",
              fontWeight: "bold",
            }}
          >
            {item.text}
          </Button>
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
            color: `${sm ? "#000" : "#bdbdbd"}`,
            textTransform: "initial",
            display: "flex",
            justifyContent: "start",
            fontSize: "16px",
            fontFamily: "inherit",
            fontWeight: "bold",
          }}
        >
          Logout
        </Button>
      </ListItem>
    </>
  );
  return (
    <>
      {sm && (
        <>
          <div>
            <IconButton onClick={() => setOpen(!open)}>
              <Menu />
            </IconButton>
          </div>
          <SwipeableDrawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
            {sideBarItems}
          </SwipeableDrawer>
        </>
      )}

      {!sm && <div className={classes.sidebarRoot}>{sideBarItems}</div>}
    </>
  );
}

export default Sidebar;
