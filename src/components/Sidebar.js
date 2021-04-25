import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  MenuItem,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  AddRounded,
  Book,
  DeleteSharp,
  NotesSharp,
  Menu,
} from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  sidebarRoot: {
    width: "270px",
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
  { icon: <Book />, text: "Notebooks" },
  { icon: <DeleteSharp />, text: "Trash" },
];

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ open });
  const sm = useMediaQuery("(max-width:600px)");

  return (
    <>
      {sm && (
        <>
          <IconButton onClick={() => setOpen(!open)}>
            <Menu style={{ justifyContent: "start" }} />
          </IconButton>
          <SwipeableDrawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
            <ListItem className={classes.userInfo}>
              <ListItemIcon>
                <Avatar>D</Avatar>
              </ListItemIcon>
              <Typography variant="h6">Debarshi</Typography>
            </ListItem>
            <Divider />
            {listItems.map((item) => (
              <ListItem key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </SwipeableDrawer>
        </>
      )}

      {!sm && (
        <div className={classes.sidebarRoot}>
          <ListItem className={classes.userInfo}>
            <ListItemIcon>
              <Avatar>D</Avatar>
            </ListItemIcon>
            <Typography variant="h5">Debarshi</Typography>
          </ListItem>
          <Divider />
          {listItems.map((item) => (
            <div key={item.text}>
              <ListItem>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Sidebar;
