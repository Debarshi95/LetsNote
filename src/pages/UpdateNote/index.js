import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NoteEditor from '../../components/NoteEditor';
import Sidebar from '../../components/Sidebar';
import strings from '../../constant/strings';

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
  container: {
    padding: theme.spacing(1),
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    '& h5': {
      fontWeight: 600,
    },
  },
}));

function UpdateNote() {
  const classes = useStyles();
  const { state: routeState } = useLocation();
  const note = useSelector((state) =>
    state.notes.notes.find((_note) => _note.id === routeState.noteId)
  );

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.container}>
        <Typography variant="h5" component="h5" className={classes.title}>
          {strings.UPDATE_NOTE}
        </Typography>
        {note && <NoteEditor title={note.title} body={note.content} noteId={note.id} />}
      </div>
    </div>
  );
}

export default UpdateNote;
