import React, {useEffect} from 'react';
import classes from '../styles/App.module.css';
import LoginPage from './LoginPage';
// import DefaultRoute from './DefaultRoute';
import NotFound from './NotFound';
import { Routes, Route, Navigate } from 'react-router'
import RecoveryPassword from './RecoveryPassword';

const App: React.FC = () : JSX.Element => {
  return (
    <div className={classes.App}>
      <Routes>
        {/* <DefaultRoute defaultPath={'/login'} /> */}
        <Route path='/' element={<Navigate to={'/login'}/>} />
        <Route path={'/login'} element={<LoginPage />}/>
        <Route path={'/recovery'} element={<RecoveryPassword/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
