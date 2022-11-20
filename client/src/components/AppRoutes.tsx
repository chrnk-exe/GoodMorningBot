import React from 'react';
// import classes from '../styles/AppRoutes.module.sass';
import LoginPage from '../pages/LoginPage';
import AppPage from '../pages/AppPage';
import SettingsPage from '../pages/SettingsPage';
import NotFound from './NotFound';
import { Routes, Route, Navigate, Outlet } from 'react-router';
import RecoveryPasswordPage from '../pages/RecoveryPasswordPage';
import { useAuthorizeQuery } from '../store/services/appApi';
import { useGetClientKeyQuery } from '../store/services/authApi';
import { useAppSelector } from '../hooks/useAppSelector';
import Loader from '../UI/Loader';
import useAppGetUserQuery from '../hooks/vkApi/useAppGetUserQuery';
import Dashboard from './Dashboard';

const AppRoutes: React.FC = (): JSX.Element => {
	const token = useAppSelector(state => state.auth.token);
	const { isLoading } = useAuthorizeQuery(token ? token : '', {
		skip: token ? false : true,
	});

	const user = useAppSelector(state => state.user);
	const clientKeyQueryResult = useGetClientKeyQuery();

	const getUserByVkApi = useAppGetUserQuery({
		user_ids: user?.userID || 0,
		fields: 'photo_200,nickname,first_name,last_name,id,email',
		name_case: 'nom',
	});

	if (isLoading || clientKeyQueryResult.isLoading || getUserByVkApi.isLoading)
		return <Loader />;

	return (
		<Routes>
			<Route path="/" element={<Navigate to={'/login'} />} />
			<Route path={'/login'} element={<LoginPage />} />
			<Route path={'/recovery'} element={<RecoveryPasswordPage />} />
			<Route
				path={'/app'}
				element={
					token ?
						<Dashboard>
							<Outlet />
						</Dashboard>
						: <Navigate to={'/login'} />
				}>
				<Route
					index
					element={
						token ? <AppPage /> : <Navigate to={'/login'} />
					}
				/>
				<Route path={'/app/settings'} element={<SettingsPage />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
