import React from 'react';
import './index.css';
import { Toaster } from 'react-hot-toast';
import MainRouter from '../MainRouter';

function App() {
  return (
    <div className="app__root">
      <MainRouter />
      <Toaster />
    </div>
  );
}

export default App;
