import { Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { DeleteForever, Edit } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotesAsync,
  moveNoteToTrashAsync,
  selectAllNotes,
} from "../features/notesSlice";
import { useToasts } from "react-toast-notifications";
import { selectUser } from "../features/userSlice";

const useStyles = makeStyles(() => ({
  notesListRoot: {
    padding: "1rem",
    flex: 1,
  },
  notesHeader: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  note: {
    padding: "1rem",
    margin: "1rem 0",
    border: "1.8px solid #bdbdbd",
    borderRadius: "14px",
    "& h5,p": {
      margin: "10px 0",
      fontFamily: "inherit",
    },
  },
  notesInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      display: "flex",
      marginLeft: "10px",
    },
  },
  noNotes: {
    height: "calc(100% - 90px)",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "inherit",
    background: "#f2f2f2",
    "& >h2": {
      textAlign: "center",
    },
  },
}));
function NoteList({ setSelectedComponent }) {
  const classes = useStyles();
  const notes = useSelector(selectAllNotes);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  React.useEffect(() => {
    dispatch(getAllNotesAsync(user.id, "notes"));
  }, [user.id, dispatch]);

  const moveToTrash = (noteId) => {
    dispatch(moveNoteToTrashAsync(noteId, user.id));
    addToast("Moved to trash", {
      appearance: "success",
      autoDismiss: "true",
    });
  };

  const handleEdit = (noteId) => setSelectedComponent("New Note", noteId);

  return (
    <div className={classes.notesListRoot}>
      <h2>Notes</h2>
      <div className={classes.notesHeader}>
        <h4>
          {notes.length} {notes.length > 1 ? "Notes" : "Note"}
        </h4>
      </div>
      <Divider />

      {!notes.length > 0 ? (
        <div className={classes.noNotes}>
          <h2>No notes found!! Try creating some..</h2>
        </div>
      ) : (
        notes.map((note) => (
          <div className={classes.note} key={note.id}>
            <Typography component="h5" variant="h5">
              {note.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: note.content }}></div>

            <div className={classes.notesInfo}>
              <h5>Last Edited: {note?.lastEdited?.toDate()?.toString()}</h5>
              <div>
                <IconButton onClick={() => moveToTrash(note.id)}>
                  <DeleteForever />
                </IconButton>

                <IconButton onClick={() => handleEdit(note.id)}>
                  <Edit />
                </IconButton>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default NoteList;
