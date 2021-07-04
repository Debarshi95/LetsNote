import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Sidebar from "../components/Sidebar";
import { createNoteAsync, updateNoteAsync } from "../features/notesSlice";
import { debounceTextInput } from "../helpers/userinput-delay";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  topbar: {
    fontSize: "14px",
    marginTop: "1rem",
  },
  title: {
    fontFamily: "inherit",
    fontWeight: "bold",
  },
  noteTitle: {
    outline: "none",
    width: "100%",
    padding: "10px 14px",
    margin: "14px 0 8px 0",
    fontSize: "16px",
  },
  editor: {
    margin: "1rem 0",
    "& .ql-container.ql-snow": {
      height: "auto",
      minHeight: "calc(100vh - 214px)",
      fontSize: "16px",
      color: "#000",
    },
  },
  error: {
    margin: 0,
    color: theme.palette.error.main,
    fontWeight: "bold",
    fontFamily: "inherit",
  },
}));

function NewNote() {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [error, setError] = React.useState("");
  const [noteDetails, setNoteDetails] = React.useState(null);
  const { addToast } = useToasts();
  const { notes } = useSelector((state) => state.notes);
  const { state } = useLocation();
  const editorRef = React.useRef();
  const dispatch = useDispatch();

  const updateDocument = React.useRef(
    debounceTextInput(
      (noteId, _text, _title) =>
        dispatch(updateNoteAsync({ noteId, _text, _title })),
      500
    )
  ).current;

  React.useEffect(() => {
    editorRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (state?.noteId) {
      const note = notes.find((_note) => _note.id === state?.noteId);
      setNoteDetails(note);
      setTitle(note.title);
      setText(note.content);
    } else {
      setNoteDetails(null);
      setTitle("");
      setText("");
      dispatch(createNoteAsync()).then((res) => {
        setNoteDetails({ id: res.payload });
        addToast("Empty note created successfully!!", {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  }, [dispatch, addToast, state, notes]);

  const handleTextChange = async (value) => {
    await setText(value);
    updateDocument(noteDetails?.id, text, title);
  };
  const handleTitleChange = async (e) => {
    await setTitle(e.target.value);
    if (title === "") {
      setError("Title cannot be empty");
    } else {
      updateDocument(noteDetails?.id, text, title);
    }
  };
  return (
    <section className={classes.root}>
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1} padding={"1rem"}>
        <div className={classes.topbar}>
          <Typography variant="h5" component="h5" className={classes.title}>
            {state?.noteId ? "Edit Note" : "Create new note"}
          </Typography>
        </div>
        <div>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            aria-label="Title"
            placeholder="Title"
            className={classes.noteTitle}
          />
          {error && <p className={classes.error}>{error}</p>}
          <ReactQuill
            className={classes.editor}
            onChange={handleTextChange}
            value={text}
            ref={editorRef}
          />
        </div>
      </Box>
    </section>
  );
}

export default NewNote;
