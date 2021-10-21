import { makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import debounceTextInput from '../../helpers/userinputdelay';

const useStyles = makeStyles((theme) => ({
  noteTitle: {
    outline: 'none',
    width: '100%',
    padding: '10px 14px',
    margin: '14px 0 8px 0',
    fontSize: '16px',
  },
  editor: {
    margin: '1rem 0',
    '& .ql-container.ql-snow': {
      height: 'auto',
      minHeight: 'calc(100vh - 214px)',
      fontSize: '16px',
      color: '#000',
    },
  },
  error: {
    margin: 0,
    color: theme.palette.error.main,
    fontWeight: 'bold',
    fontFamily: 'inherit',
    fontSize: '0.9rem',
  },
}));

function NoteForm({ title: defaultTitle, body: defaultBody }) {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const inputRef = React.useRef();
  const editorRef = React.useRef();

  React.useEffect(() => {
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
      setError('Title cannot be empty');
    }

    updateDocument({ title: value, body: editorRef.current.state.value });
  };

  return (
    <div>
      <input
        type="body"
        onChange={handleTitleChange}
        aria-label="Title"
        placeholder="Title"
        className={classes.noteTitle}
        ref={inputRef}
        defaultValue={defaultTitle}
      />
      {error && <p className={classes.error}>{error}</p>}
      <ReactQuill
        className={classes.editor}
        onChange={handleBodyChange}
        ref={editorRef}
        defaultValue={defaultBody}
      />
    </div>
  );
}
NoteForm.defaultProps = {
  title: '',
  body: '',
};

export default NoteForm;
