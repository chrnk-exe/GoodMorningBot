import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import TextFieldPassword from '../../UI/TextFieldPassword';
import classes from '../../styles/LoginPage.module.sass';
import vkicon from '../../assets/vk-icon.svg';
import {
	useLoginUserMutation,
	useNewUserMutation,
	useGetUserByVkQuery,
} from '../../store/services/authApi';


import { isResponse } from '../../typeguards/isResponse';
import { useAppSelector } from '../../hooks/useAppSelector';
import useAppGetUserQuery from '../../hooks/vkApi/useAppGetUserQuery';

enum loginPageState {
	LOGIN = 'Вход',
	REGISTRATION = 'Регистрация',
}

const Login = () => {
	const [pageState, setPageState] = useState(loginPageState.LOGIN);
	const [userState, setUserState] = useState({
		login: '',
		password: '',
	});

	const [validatePassword, setValidatePassword] = useState('');
	const navigator = useNavigate();

	const clientKey = useAppSelector(state => state.auth.clientKey);
	const code = window.location.search.split('=')[1];

	const [loginUser] = useLoginUserMutation();
	const [registerUser] = useNewUserMutation();

	const { data } = useGetUserByVkQuery(code, {
		skip: !code,
	});
	

	const result = useAppGetUserQuery(
		{
			user_ids: data?.id || 0,
			fields: 'photo_200,nickname,first_name,last_name,id,email',
			name_case: 'nom',
		},
		!code,
	);

	const oauthWithVk = async () => {
		if (clientKey) {
			window.location.href = `https://oauth.vk.com/authorize?client_id=${clientKey}&display=popup&redirect_uri=http://localhost:3000/login&scope=videos,email,offline,video&response_type=code&v=5.52`;
		}
	};

	const authWithLogin = async () => {
		const response = await loginUser(userState);
		if (isResponse<ILoginResponse>(response)) {
			if (response.data.auth) {
				navigator('/app', { replace: true });
			} else {
				if (!response.data.auth) {
					alert(response.data.info);
				}
			}
		} else {
			console.log(response.error);
		}
	};

	const registerNewUser = async () => {
		const response = await registerUser(userState);
		if (isResponse<ILoginResponse>(response)) {
			if (response.data.auth) {
				navigator('/app', { replace: true });
			} else {
				console.log(response.data);
				if (!response.data.auth) {
					alert(response.data.info);
				}
			}
		} else {
			console.log(response.error);
		}
		// console.log(response, isResponse<ILoginResponse>(response));
		return;
	};

	if (result.isSuccess) return <Navigate to="/app" />;

	return (
		<div className={classes.loginPage}>
			<div className={classes.loginPageContainer}>
				<h2 className={classes.loginPageItem}>{pageState}</h2>
				<div className={classes.loginPageItem}>
					<TextField
						// inputProps={{style: {fontSize: '1.1em'}}}
						fullWidth
						label="Email"
						variant="outlined"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUserState({
								...userState,
								login: e.target.value,
							})
						}
					/>
				</div>
				<div className={classes.loginPageItem}>
					<TextFieldPassword
						onChangeEventFunction={(
							e: React.ChangeEvent<HTMLInputElement>,
						) =>
							setUserState({
								...userState,
								password: e.target.value,
							})
						}
					/>
				</div>
				{pageState === loginPageState.REGISTRATION ? (
					<div className={classes.loginPageItem}>
						<TextFieldPassword
							color={
								userState.password !== validatePassword
									? 'error'
									: 'success'
							}
							onChangeEventFunction={(
								e: React.ChangeEvent<HTMLInputElement>,
							) => setValidatePassword(e.target.value)}
							helperText={
								userState.password !== validatePassword
									? 'Пароли должны совпадать'
									: ''
							}
						/>
					</div>
				) : null}
				<div
					className={[
						classes.loginPageItem,
						classes.passwordRecoveryPage,
					].join(' ')}>
					<Link
						className={classes.recoveryButton}
						to={'/recovery'}
						replace>
						Забыли пароль?
					</Link>
				</div>
				<div className={classes.loginPageItem}>
					<Button
						fullWidth
						size="large"
						variant="contained"
						color={'secondary'}
						onClick={
							pageState === loginPageState.LOGIN
								? authWithLogin
								: registerNewUser
						}>
						{pageState}
					</Button>
				</div>
				<div className={classes.loginPageItem}>
					<Button
						fullWidth
						size="large"
						onClick={() => {
							setPageState(
								pageState === loginPageState.LOGIN
									? loginPageState.REGISTRATION
									: loginPageState.LOGIN,
							);
							setUserState({
								login: '',
								password: '',
							});
						}}>
						{pageState === loginPageState.LOGIN
							? 'Зарегистрироваться'
							: 'Авторизация'}
					</Button>
				</div>
				<img
					onClick={oauthWithVk}
					className={[classes.vkIcon, classes.loginPageItem].join(
						' ',
					)}
					width={50}
					height={50}
					src={vkicon}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Login;
