import React from 'react';
import classes from '../styles/AppRoutes.module.sass';
import LoginPage from '../pages/LoginPage';
import AppPage from '../pages/AppPage';
import SettingsPage from '../pages/SettingsPage';
import NotFound from './NotFound';
import { Routes, Route, Navigate } from 'react-router';
import RecoveryPasswordPage from '../pages/RecoveryPasswordPage';
import { useAuthorizeQuery } from '../store/services/appApi';
import {useGetClientKeyQuery} from '../store/services/authApi';
import { useAppSelector } from '../hooks/useAppSelector';
import Loader from '../UI/Loader';

const AppRoutes: React.FC = (): JSX.Element => {
	const token = useAppSelector(state => state.auth.token);
	const { isLoading } = useAuthorizeQuery(token ? token : '', {
		skip: token ? false : true,
	});

	const clientKeyQueryResult = useGetClientKeyQuery();
	
	if (isLoading || clientKeyQueryResult.isLoading) return <Loader />;

	return (
		<div className={classes.App}>
			<Routes>
				<Route path="/" element={<Navigate to={'/login'} />} />
				<Route path={'/login'} element={<LoginPage />} />
				<Route path={'/recovery'} element={<RecoveryPasswordPage />} />
				<Route path={'/settings'} element={<SettingsPage />} />
				<Route
					path={'/app'}
					element={token ? <AppPage /> : <Navigate to={'/login'} />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default AppRoutes;
