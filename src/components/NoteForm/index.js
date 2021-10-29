import { Box, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import strings from '../../constant/strings';

import debounceTextInput from '../../helpers/userinputdelay';

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
      minHeight: 'calc(100vh - 20rem)',
      fontSize: '1rem',
      fontFamily: 'inherit',
      [theme.breakpoints.up('sm')]: {
        minHeight: 'calc(100vh - 15rem)',
      },
    },
  },
}));

function NoteForm({ title: defaultTitle, body: defaultBody }) {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const inputRef = useRef();
  const editorRef = useRef();

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateDocument = useCallback(
    debounceTextInput(({ title, body }) => {
      console.log({ title, body });
    }, 2000),
    []
  );

  const handleBodyChange = (value) => {
    updateDocument({ title: inputRef.current.value, body: value });
  };
  const handleTitleChange = (e) => {
    const { value } = e.target;

    if (error) {
      setError('');
    }
    if (value === '') {
      setError(strings.NO_EMPTY_TITLE);
    }

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
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <ReactQuill
        className={classes.editor}
        onChange={handleBodyChange}
        ref={editorRef}
        defaultValue={defaultBody}
      />
    </Box>
  );
}
NoteForm.defaultProps = {
  title: '',
  body: '',
};

export default NoteForm;
