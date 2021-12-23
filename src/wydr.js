import React from 'react';

if (process.env.NODE_ENV === 'development') {
  // optional dependency required only in dev mode
  // eslint-disable-next-line global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
