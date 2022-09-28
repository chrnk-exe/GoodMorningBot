import React from 'react';
import classes from '../styles/AppRoutes.module.scss';
import LoginPage from '../pages/LoginPage';
import AppPage from '../pages/AppPage';
import NotFound from './NotFound';
import { Routes, Route, Navigate } from 'react-router';
import RecoveryPasswordPage from '../pages/RecoveryPasswordPage';

const AppRoutes: React.FC = ():JSX.Element => {
	return (
		<div className={classes.App}>
			<Routes>
				<Route path='/' element={<Navigate to={'/login'}/>} />
				<Route path={'/login'} element={<LoginPage />}/>
				<Route path={'/recovery'} element={<RecoveryPasswordPage/>} />
				<Route path={'/app'} element={<AppPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default AppRoutes;
