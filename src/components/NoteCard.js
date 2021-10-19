import { Box, makeStyles, Typography, IconButton } from '@material-ui/core';
import { DeleteForeverOutlined, EditRounded, ClearRounded } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { deleteNoteAsync, moveNoteToTrashAsync } from '../features/notesSlice';

const useStyles = makeStyles(() => ({
  note: {
    padding: '1rem',
    margin: '0.6rem 0',
    border: '1.8px solid #bdbdbd',
    borderRadius: '14px',
    '& h5,p': {
      margin: '10px 0',
      fontFamily: 'inherit',
    },
  },
  noteInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > div': {
      display: 'flex',
      marginLeft: '10px',
    },
  },
}));

function NoteCard({ note, type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();

  const moveNoteToTrash = (noteId) => {
    dispatch(moveNoteToTrashAsync(noteId)).then(() => {
      addToast('Moved to trash', {
        appearance: 'success',
        autoDismiss: 'true',
      });
    });
  };

  const deleteNote = (noteId) => {
    dispatch(deleteNoteAsync(noteId)).then(() => {
      addToast('Note deleted successfully!!', {
        appearance: 'success',
        autoDismiss: 'true',
      });
    });
  };

  const editNote = (noteId) => history.push(`/edit/${noteId}`, { noteId });

  return (
    <Box className={classes.note}>
      <Typography component="h5" variant="h5">
        {note.title}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
      <div className={classes.noteInfo}>
        <Typography variant="body2" component="h5">
          Last Edited: {note?.lastEdited?.toDate()?.toString()}
        </Typography>
        <div>
          {type === 'trash' ? (
            <>
              <IconButton onClick={() => deleteNote(note.id)}>
                <ClearRounded />
              </IconButton>

              <IconButton onClick={() => editNote(note.id)}>
                <EditRounded />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => moveNoteToTrash(note.id)}>
                <DeleteForeverOutlined />
              </IconButton>

              <IconButton onClick={() => editNote(note.id)}>
                <EditRounded />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </Box>
  );
}

export default NoteCard;
