/* eslint-disable react/no-danger */
import { Box, makeStyles, Typography, IconButton } from '@material-ui/core';
import { HighlightOffTwoTone } from '@material-ui/icons';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteNote } from '../../services';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    background: theme.palette.background.paper,
    borderRadius: '0.25rem',
    height: 'fit-content',
    marginTop: '1rem',
    '& > h4': {
      fontWeight: 300,
      fontSize: '1.65rem',
    },
  },
  noteContent: {
    margin: '0.6rem 0',
  },
  noteInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function NoteCard({ note }) {
  const classes = useStyles();

  const history = useHistory();

  const deleteCurrentNote = async (e, noteId) => {
    e.preventDefault();
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.log(error, history);
    }
  };

  return (
    <Link to={{ pathname: `/edit/${note.id}`, state: { noteId: note.id } }}>
      <Box className={classes.root}>
        <Typography component="h4" variant="h4">
          {note.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: note.content }} className={classes.noteContent} />
        <div className={classes.noteInfo}>
          <Typography variant="body2" component="h5">
            Last Edited: {note?.lastEdited?.toDate()?.toString()}
          </Typography>
          <div>
            <IconButton onClick={(e) => deleteCurrentNote(e, note.id)}>
              <HighlightOffTwoTone />
            </IconButton>
          </div>
        </div>
      </Box>
    </Link>
  );
}

export default NoteCard;
