import React from 'react';

export default function loadable(importFunc) {
  return React.lazy(importFunc);
}
