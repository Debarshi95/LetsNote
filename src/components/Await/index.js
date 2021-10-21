import React from 'react';
import Loader from '../Loader';

function Await({ isLoading, hasError, hasData, children }) {
  if (isLoading) return <Loader />;
  if (hasError) {
    console.log('error');
  }
  if (hasData) {
    return children;
  }
  return null;
}

export default Await;
