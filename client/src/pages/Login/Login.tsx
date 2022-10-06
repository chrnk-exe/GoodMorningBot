import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import TextFieldPassword from '../../UI/TextFieldPassword';
import classes from '../../styles/LoginPage.module.scss';
import vkicon from '../../assets/vk-icon.svg';
import { useLoginUserMutation, useNewUserMutation } from '../../services/userApi';
import { isResponse } from '../../typeguards/isResponse';

enum loginPageState {
    LOGIN = 'Вход',
    REGISTRATION = 'Регистрация'
}

const Login = () => {
	const [pageState, setPageState] = useState(loginPageState.LOGIN);
	const [userState, setUserState] = useState({
		login: '',
		password: ''
	});
	const [loginUser] = useLoginUserMutation();
	const [registerUser] = useNewUserMutation();
	const navigator = useNavigate();

	const oauthWithVk = () => {
		alert('Coming soon!');
	};

	const authWithLogin = async () => {
		const response = await loginUser(userState);
		if( isResponse<ILoginResponse>(response) ){
			if(response.data.auth){
				console.log('redir');
				navigator('/app', {replace: true});
			}
			else {
				if(!response.data.auth){
					alert(response.data.info);
				}
			}
		} else {
			console.log(response.error);
		}
	};

	const registerNewUser = async () => {
		const response = await registerUser(userState);
		if( isResponse<ILoginResponse>(response) ){
			if(response.data.auth){
				navigator('/app', {replace: true});
			}
			else {
				console.log(response.data);
				if(!response.data.auth){
					alert(response.data.info);
				}
			}
		} else {
			console.log(response.error);
		}
		console.log(response, isResponse<ILoginResponse>(response));
		return;
	};

	return (
		<div className={classes.loginPage}>
			<div className={classes.loginPageContainer}>
				<h2 className={classes.loginPageItem}>{pageState}</h2>
				<div className={classes.loginPageItem} >
					<TextField 
						// inputProps={{style: {fontSize: '1.1em'}}}
						fullWidth
						label="Email" 
						variant="outlined" 
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserState({...userState, login: e.target.value})}/>
				</div>
				<div className={classes.loginPageItem} >
					<TextFieldPassword onChangeEventFunction={(e: React.ChangeEvent<HTMLInputElement>) => setUserState({...userState, password: e.target.value})}/>
				</div>
				<div className={[classes.loginPageItem, classes.passwordRecoveryPage].join(' ')}><Link className={classes.recoveryButton} to={'/recovery'} replace>Забыли пароль?</Link></div>
				<div className={classes.loginPageItem} >
					<Button 
						fullWidth
						size="large"
						variant="contained" 
						color={'secondary'}
						onClick={pageState === loginPageState.LOGIN ? authWithLogin : registerNewUser}>
						{pageState}
					</Button>
				</div>
				<div className={classes.loginPageItem} >
					<Button 
						fullWidth
						size="large"
						onClick={() => setPageState(pageState === loginPageState.LOGIN ? loginPageState.REGISTRATION : loginPageState.LOGIN)}
					>
						{pageState === loginPageState.LOGIN ? 'Зарегистрироваться' : 'Авторизация'}
					</Button>
				</div>
				<img onClick={oauthWithVk} className={[classes.vkIcon, classes.loginPageItem].join(' ')} width={50} height={50} src={vkicon} alt=''/>
			</div>
		</div>
	);
};

export default Login;