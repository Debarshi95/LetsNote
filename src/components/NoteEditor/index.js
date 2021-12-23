import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from 'react-redux';
import debounceTextInput from '../../helpers/userinputdelay';
import { requestUpdateNote } from '../../store/slices/notes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  titleInputWrapper: {
    marginBottom: '1rem',
  },
  titleInput: {
    outline: 'none',
    width: '100%',
    padding: '0.8rem 1rem',
    marginTop: '1rem',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
  editor: {
    '& .ql-container.ql-snow': {
      fontSize: theme.spacing(2),
      fontFamily: 'inherit',
      wordBreak: 'break-all',
      minHeight: '65vh',
      [theme.breakpoints.up('sm')]: {
        minHeight: 'calc(100vh - 15rem)',
      },
    },
  },
}));

const NoteEditor = ({ title: defaultTitle, body: defaultBody, noteId }) => {
  const classes = useStyles();
  const inputRef = useRef();
  const editorRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDocument = useCallback(
    debounceTextInput(({ title, body }) => {
      dispatch(requestUpdateNote({ content: body, title, noteId, userId: user.uid }));
    }, 500),
    [noteId, user?.uid]
  );

  const handleBodyChange = (value) => {
    updateDocument({ title: inputRef.current.value, body: value });
  };
  const handleTitleChange = (e) => {
    const { value } = e.target;
    updateDocument({ title: value, body: editorRef.current.state.value });
  };

  return (
    <Box className={classes.root}>
      <div className={classes.titleInputWrapper}>
        <input
          type="body"
          onChange={handleTitleChange}
          aria-label="Title"
          placeholder="Title"
          className={classes.titleInput}
          ref={inputRef}
          defaultValue={defaultTitle}
        />
      </div>
      <ReactQuill
        className={classes.editor}
        onChange={handleBodyChange}
        ref={editorRef}
        defaultValue={defaultBody}
      />
    </Box>
  );
};
NoteEditor.defaultProps = {
  title: '',
  body: '',
  noteId: '',
};

export default NoteEditor;
