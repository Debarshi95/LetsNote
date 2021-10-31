import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NoteForm from '../../components/NoteForm';
import { getNoteById } from '../../services';
import strings from '../../constant/strings';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: theme.palette.background.paper,
    flex: 1,
    padding: '1rem',
    flexDirection: 'column',
  },
  topbar: {
    fontSize: '0.8rem',
  },
  title: {
    fontWeight: 600,
  },
}));

function UpdateNote() {
  const classes = useStyles();
  const { state } = useLocation();
  const [note, setNote] = useState();

  useEffect(() => {
    if (state.noteId) {
      getNoteById(state.noteId).then((res) => {
        setNote({ id: res.id, ...res.data() });
      });
    }
  }, [state?.noteId]);

  return (
    <Box className={classes.root}>
      <div className={classes.topbar}>
        <Typography variant="h5" component="h5" className={classes.title}>
          {strings.UPDATE_NOTE}
        </Typography>
      </div>
      <div>{note && <NoteForm title={note.title} body={note.content} />}</div>
    </Box>
  );
}

export default UpdateNote;
