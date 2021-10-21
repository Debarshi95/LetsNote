import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import NoteForm from '../../components/NoteForm';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  topbar: {
    fontSize: '14px',
    marginTop: '1rem',
  },
  title: {
    fontFamily: 'inherit',
    fontWeight: 'bold',
  },
}));

function UpdateNote() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1} padding="1rem">
        <div className={classes.topbar}>
          <Typography variant="h5" component="h5" className={classes.title}>
            Update Note
          </Typography>
        </div>
        <div>
          <NoteForm title="This is some edit title" body="This is some edit body" note={{}} />
        </div>
      </Box>
    </section>
  );
}

export default UpdateNote;
