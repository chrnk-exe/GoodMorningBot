import React, {useEffect} from 'react';
import classes from '../styles/App.module.css';
import LoginPage from './LoginPage';
import MainApp from './MainApp';
import NotFound from './NotFound';
import { Routes, Route, Navigate } from 'react-router'
import RecoveryPassword from './RecoveryPassword';

const App: React.FC = () : JSX.Element => {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>} />
        <Route path={'/login'} element={<LoginPage />}/>
        <Route path={'/recovery'} element={<RecoveryPassword/>} />
        <Route path={'/app'} element={<MainApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
