import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import classes from '../../styles/LoginPage.module.sass';
import vkicon from '../../assets/vk-icon.svg';
import {
	useLoginUserMutation,
	useGetUserByVkQuery,
} from '../../store/services/authApi';


import { useAppSelector } from '../../hooks/useAppSelector';
import useAppGetUserQuery from '../../hooks/vkApi/useAppGetUserQuery';

const Login = () => {
	const clientKey = useAppSelector(state => state.auth.clientKey);
	const code = window.location.search.split('=')[1];

	const { data } = useGetUserByVkQuery(code, {
		skip: !code,
	});
	
	console.log(code);

	const result = useAppGetUserQuery(
		{
			user_ids: data?.id || 0,
			fields: 'photo_200,nickname,first_name,last_name,id,email',
			name_case: 'nom',
		},
		!code,
	);

	console.log(result);

	const oauthWithVk = async () => {
		if (clientKey) {
			window.location.href = `https://oauth.vk.com/authorize?client_id=${clientKey}&display=popup&redirect_uri=
			http://localhost:3000/login&scope=videos,email,offline,video&response_type=code&v=5.52`;
		}
	};

	if (result.isSuccess) return <Navigate to="/app" />;

	return (
		<Box className={classes.loginPage}>
			<Box className={classes.loginPageContainer}>
				<Typography >
					Для входа используется авторизация через ВК!
				</Typography>
				<Button onClick={oauthWithVk} variant={'outlined'} startIcon={<img className={[classes.vkIcon, classes.loginPageItem].join(
					' ',
				)} src={vkicon} width={50} height={50}/>}>
					Войти
				</Button>
			</Box>
		</Box>
	);
};

export default Login;
