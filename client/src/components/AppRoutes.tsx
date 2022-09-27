import React from 'react';
import classes from '../styles/AppRoutes.module.scss';
import LoginPage from './LoginPage';
import App from './App';
import NotFound from './NotFound';
import { Routes, Route, Navigate } from 'react-router';
import RecoveryPassword from './RecoveryPassword';

const AppRoutes: React.FC = () : JSX.Element => {
	return (
		<div className={classes.App}>
			<Routes>
				<Route path='/' element={<Navigate to={'/login'}/>} />
				<Route path={'/login'} element={<LoginPage />}/>
				<Route path={'/recovery'} element={<RecoveryPassword/>} />
				<Route path={'/app'} element={<App />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default AppRoutes;
