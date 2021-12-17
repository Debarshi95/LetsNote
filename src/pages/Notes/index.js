import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import NoteCard from '../../components/NoteCard';
import Sidebar from '../../components/Sidebar';
import { requestGetNotes } from '../../store/slices/notes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  notes: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'inherit',
    overflow: 'hidden',
    flex: 1,
  },
  messageDiv: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Notes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (user?.uid) {
      dispatch(requestGetNotes(user?.uid));
    }
  }, [dispatch, user?.uid]);

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.notes}>
        {notes.length ? (
          notes.map((note) => <NoteCard key={note.id} note={note} type="notes" />)
        ) : (
          <div className={classes.messageDiv}>
            <h2>No Notes Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
