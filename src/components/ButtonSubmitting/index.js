import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '72%',
    padding: '0.7rem',
    margin: '0.85rem auto',
    borderRadius: '1.75rem',
    display: 'flex',
    justifyContent: 'center',
    border: 0,
    backgroundColor: '#049d7c',
    fontFamily: 'inherit',

    [theme.breakpoints.down('xs')]: {
      padding: '0.85rem',
    },

    '& > div': {
      height: '22px !important',
      width: '22px !important',
    },
  },
}));

function ButtonSubmitting({ submitting, submit, disabled, btnText }) {
  const classes = useStyles();

  return (
    <>
      {submitting ? (
        <div className={classes.root}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Button
          variant="contained"
          disableElevation
          type="click"
          onClick={submit}
          disabled={disabled}
        >
          {btnText}
        </Button>
      )}
    </>
  );
}

export default ButtonSubmitting;
