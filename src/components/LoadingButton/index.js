import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';

const progressBarStyle = {
  width: '1.4rem',
  height: '1.4rem',
};

const LoadingButton = ({ loading, onClick, disabled, text }) => {
  return (
    <>
      {loading ? (
        <Button disableElevation disabled variant="contained" type="click">
          <CircularProgress color="secondary" style={progressBarStyle} />
        </Button>
      ) : (
        <Button
          variant="contained"
          disableElevation
          type="click"
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default LoadingButton;
