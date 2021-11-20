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
}));
const Notes = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    if (user?.uid) {
      dispatch(requestGetNotes(user.uid));
    }
  }, [dispatch, user?.uid]);
  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.notes}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} type="notes" />
        ))}
      </div>
    </div>
  );
};

export default Notes;
