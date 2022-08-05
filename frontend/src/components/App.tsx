import React from 'react';
import classes from '../styles/App.module.css';
import LoginPage from './LoginPage';
import NotFound from './NotFound';
import { Routes, Route } from 'react-router'

function App() {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path={'/login'} element={<LoginPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
