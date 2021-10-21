import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

function Loader() {
  return (
    <Box flex="1" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
}

export default Loader;
