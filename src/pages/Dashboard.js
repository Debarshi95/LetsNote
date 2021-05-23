import { makeStyles } from "@material-ui/core";
import React from "react";
import Sidebar from "../components/Sidebar";
import NewNote from "../components/NewNote";
import NoteList from "../components/NoteList";
import Trash from "../components/Trash";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataById, selectUser } from "../features/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const [selectedComponent, setSelectedComponent] = React.useState("Notes");
  const [selectedNoteId, setSelectedNoteId] = React.useState(null);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserDataById(user.uid));
  }, [user.uid, dispatch]);

  return (
    <div className={classes.root}>
      <Sidebar setSelectedComponent={setSelectedComponent} />

      <>
        {selectedComponent === "Notes" && (
          <NoteList
            setSelectedComponent={setSelectedComponent}
            setSelectedNoteId={setSelectedNoteId}
          />
        )}
        {selectedComponent === "New Note" && (
          <NewNote noteId={selectedNoteId} />
        )}
        {selectedComponent === "Trash" && (
          <Trash
            setSelectedComponent={setSelectedComponent}
            setSelectedNoteId={setSelectedNoteId}
          />
        )}
      </>
    </div>
  );
}

export default Dashboard;
