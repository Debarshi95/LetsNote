import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { makeStyles, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { requestCreateNote } from '../../store/slices/notes';
import NoteEditor from '../../components/NoteEditor';
import strings from '../../constant/strings';
import Sidebar from '../../components/Sidebar';

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
  formContainer: {
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

const CreateNote = () => {
  const [docId, setDocId] = useState('');
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCreateNote({ userId: user.uid }))
      .unwrap()
      .then((data) => {
        setDocId(data);
        toast.success(strings.EMPTY_NOTE_CREATED, { position: 'top-right' });
      })
      .catch((err) => toast.error(err?.message || strings.SOMETHING_WENT_WRONG));
  }, [dispatch, user.uid]);

  return (
    <div className={classes.root}>
      <Sidebar />
      <div className={classes.formContainer}>
        <Typography variant="h5" component="h5">
          {strings.CREATE_NOTE}
        </Typography>
        <NoteEditor noteId={docId} />
      </div>
    </div>
  );
};

export default CreateNote;
