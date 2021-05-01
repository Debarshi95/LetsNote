import { makeStyles } from "@material-ui/core";
import React from "react";
import Sidebar from "../components/Sidebar";
import NewNote from "../components/NewNote";
import NoteList from "../components/NoteList";
import Trash from "../components/Trash";

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

  const handleComponentSelection = (item, noteId) => {
    if (noteId) {
      setSelectedNoteId(noteId);
    } else {
      setSelectedNoteId(null);
    }
    setSelectedComponent(item);
  };

  return (
    <div className={classes.root}>
      <Sidebar handleComponentSelection={handleComponentSelection} />

      <>
        {selectedComponent === "Notes" && (
          <NoteList setSelectedComponent={handleComponentSelection} />
        )}
        {selectedComponent === "New Note" && (
          <NewNote noteId={selectedNoteId} />
        )}
        {selectedComponent === "Trash" && (
          <Trash setSelectedComponent={handleComponentSelection} />
        )}
      </>
    </div>
  );
}

export default Dashboard;
