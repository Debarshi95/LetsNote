import { Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Clear, Edit } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNoteAsync,
  getAllNotesAsync,
  selectAllNotes,
} from "../features/notesSlice";
import { useToasts } from "react-toast-notifications";
import { selectUser } from "../features/userSlice";

const useStyles = makeStyles(() => ({
  trashRoot: {
    padding: "1rem",
    flex: 1,
  },
  trashHeader: {
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
function Trash({ setSelectedComponent }) {
  const classes = useStyles();
  const notes = useSelector(selectAllNotes);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const deleteTrash = (noteId) => {
    dispatch(deleteNoteAsync(noteId, user.id)).then((data) =>
      console.log(data)
    );
    addToast("Note deleted successfully!!", {
      appearance: "success",
      autoDismiss: "true",
    });
  };

  const handleEdit = (noteId) => setSelectedComponent("New Note", noteId);

  React.useEffect(() => {
    dispatch(getAllNotesAsync(user.id, "trash"));
    console.log("useEfect called");
  }, [user.id, dispatch]);

  return (
    <div className={classes.trashRoot}>
      <h2>Trash</h2>
      <div className={classes.trashHeader}>
        <h4>
          {notes.length} {notes.length > 1 ? "Notes" : "Note"}
        </h4>
      </div>
      <Divider />

      {!notes.length > 0 ? (
        <div className={classes.noNotes}>
          <h2>Empty!! Move notes to trash..</h2>
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
                <IconButton onClick={() => deleteTrash(note.id)}>
                  <Clear />
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
export default Trash;
