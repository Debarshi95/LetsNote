import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { createNoteAsync, updateNoteAsync } from "../features/notesSlice";
import { selectUser } from "../features/userSlice";
import { debounceTextInput } from "../helpers/userinput-delay";

const useStyles = makeStyles((theme) => ({
  newNoteRoot: {
    width: "calc(100% - 320px)",
    background: "#fafafa",
    color: "gray",
    padding: "0 1rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "& >p": {
      fontSize: "14px",
    },
  },
  editor: {
    margin: "1rem 0",
    "& .ql-container.ql-snow": {
      height: "auto",
      minHeight: "calc(100vh - 80px)",
      fontSize: "16px",
      color: "#000",
    },
  },
  topbar: {
    fontSize: "14px",
    marginTop: "1rem",
  },
  noteTitle: {
    outline: "none",
    width: "100%",
    padding: "10px 14px",
    margin: "1rem 0",
    fontSize: "16px",
  },
  error: {
    margin: "2px 0",
    color: theme.palette.error.main,
    fontWeight: "bold",
    fontFamily: "inherit",
  },
}));

function NewNote({ noteId }) {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");
  const editorRef = React.useRef();
  const newNoteId = React.useRef();
  const { addToast } = useToasts();
  const { user } = useSelector(selectUser);
  const selectedNote = useSelector((state) =>
    state.notes.notes.find((note) => note.id === noteId)
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    editorRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (selectedNote) {
      setText(selectedNote.content);
      setTitle(selectedNote.title);
      newNoteId.current = noteId;
    } else {
      setText("");
      setTitle("");
      dispatch(
        createNoteAsync({ title, content: text, userId: user?.id })
      ).then((id) => {
        newNoteId.current = id;
        addToast("Empty note created successfully!!", {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, dispatch, selectedNote]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDocument = React.useCallback(
    debounceTextInput(
      () => dispatch(updateNoteAsync(newNoteId.current, title, text)),
      1500
    ),
    [text, title]
  );

  const handleTextChange = (value) => {
    setText(value);
    if (title === "") {
      setError("Title cannot be empty");
    } else {
      updateDocument();
    }
  };

  return (
    <div className={classes.newNoteRoot}>
      <div className={classes.topbar}>
        <h2>{noteId ? "Edit Note" : "New Note"}</h2>
      </div>
      <div>
        <input
          type="text"
          value={title}
          onChange={({ target }) => {
            setError("");
            setTitle(target.value);
          }}
          aria-label="Title"
          placeholder="Title"
          className={classes.noteTitle}
        />
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <ReactQuill
        className={classes.editor}
        onChange={handleTextChange}
        value={text}
        ref={editorRef}
      />
    </div>
  );
}

export default NewNote;
