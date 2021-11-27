/* eslint-disable react/no-danger */
import { makeStyles, Typography, IconButton, Card } from '@material-ui/core';
import { HighlightOffTwoTone } from '@material-ui/icons';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestDeleteNote } from '../../store/slices/notes';
import { formatDate } from '../../utils/helper-func';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    textDecoration: 'none',
  },
  noteContainer: {
    padding: theme.spacing(2),
    minHeight: theme.spacing(20),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: `2px solid ${theme.palette.background.default}`,
    backgroundColor: theme.palette.background.default,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&  h4': {
      fontWeight: 300,
      fontSize: theme.spacing(2.8),
    },
  },
  noteInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

function NoteCard({ note }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deleteCurrentNote = async (e, noteId) => {
    e.preventDefault();
    try {
      await dispatch(requestDeleteNote(noteId));
    } catch (error) {
      //
    }
  };

  return (
    <Link
      to={{ pathname: `/edit/${note.id}`, state: { noteId: note.id } }}
      className={classes.root}
    >
      <Card className={classes.noteContainer} elevation={0}>
        <Typography component="h4" variant="h4">
          {note.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: note.content }} />
        <div className={classes.noteInfo}>
          <Typography variant="body2" component="h5">
            Last Edited: {note?.updatedAt && formatDate(note.updatedAt)}
          </Typography>

          <IconButton onClick={(e) => deleteCurrentNote(e, note.id)}>
            <HighlightOffTwoTone />
          </IconButton>
        </div>
      </Card>
    </Link>
  );
}

export default memo(NoteCard);
