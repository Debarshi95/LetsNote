import React from "react";
import { Divider, makeStyles, Typography, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotesAsync } from "../features/notesSlice";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import NoteCard from "../components/NoteCard";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  notesContainer: {
    padding: "1rem",
    flex: 1,
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },

  title: {
    fontFamily: "inherit",
    fontSize: "1.8rem",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.35rem",
    },
  },
  subTitle: {
    fontSize: "1.15rem",
    margin: "6px 0",

    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
}));
function NoteList() {
  const classes = useStyles();
  const { notes, loading } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllNotesAsync("notes"));
  }, [user, dispatch]);

  return (
    <section className={classes.root}>
      <Sidebar />
      {loading ? (
        <Loader />
      ) : notes?.length > 0 ? (
        <Box className={classes.notesContainer}>
          <Typography variant="h4" component="h3" className={classes.title}>
            Notes
          </Typography>

          <Typography variant="h6" component="h6" className={classes.subTitle}>
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </Typography>

          <Divider />
          <Box display="flex" flexDirection="column" margin={"0.6rem 0"}>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} type="notes" />
            ))}
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">No notes</Typography>
        </Box>
      )}
    </section>
  );
}
export default NoteList;
