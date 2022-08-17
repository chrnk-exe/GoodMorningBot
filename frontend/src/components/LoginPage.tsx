import React, {useState} from 'react'
import classes from '../styles/LoginPage.module.css'
import { TextField, Button } from '@mui/material'
import vkicon from '../assets/vk-icon.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

enum loginPageState {
    LOGIN = 'Вход',
    REGISTRATION = 'Регистрация'
}

const LoginPage = () => {
    const [pageState, setPageState] = useState(loginPageState.LOGIN)
    const [userState, setUserState] = useState({
        login: '',
        password: ''
    })
    const oauthWithVk = () => {
        alert('Coming soon!')
    }

    const authWithLogin = async () => {
        console.log('Auth Comint soon!')
        const response: AxiosResponse<LoginResponse> = await axios.post('http://localhost:5000/api/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                login: userState.login,
                password: userState.password
            }
        })
        console.log(response.data)
    }

    const registerNewUser = async () => {
        console.log('Register Coming soon!')
        const response: AxiosResponse<RegistrationResponse> = await axios.post('http://localhost:5000/api/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                login: userState.login,
                password: userState.password    
            }
        })
        console.log(response.data)
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.loginPageContainer}>
                <h2 className={classes.loginPageItem}>{pageState}</h2>
                <div className={classes.loginPageItem} >
                    <TextField 
                            style={{width:'100%'}} 
                            label="Email" 
                            variant="outlined" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserState({...userState, login: e.target.value})}/>
                </div>
                <div className={classes.loginPageItem} >
                    <TextField 
                            style={{width:'100%'}} 
                            label="Пароль" 
                            variant="outlined" 
                            type={'password'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserState({...userState, password: e.target.value})}/>
                </div>
                <div className={[classes.loginPageItem, classes.passwordRecoveryPage].join(' ')}><Link className={classes.recoveryButton} to={'/recovery'} replace>Забыли пароль?</Link></div>
                <div className={classes.loginPageItem} >
                    <Button 
                        size="large"
                        style={{width:'100%'}}
                        variant="contained" 
                        color={'secondary'}
                        onClick={pageState === loginPageState.LOGIN ? authWithLogin : registerNewUser}>
                            {pageState}
                    </Button>
                </div>
                <div className={classes.loginPageItem} >
                    <Button 
                        style={{width:'100%'}}
                        size="large"
                        onClick={() => setPageState(pageState === loginPageState.LOGIN ? loginPageState.REGISTRATION : loginPageState.LOGIN)}
                        >
                            {pageState === loginPageState.LOGIN ? 'Зарегистрироваться' : 'Авторизация'}
                    </Button>
                </div>
                <img onClick={oauthWithVk} className={[classes.vkIcon, classes.loginPageItem].join(' ')} width={50} height={50} src={vkicon} alt=''/>
            </div>
        </div>
    )
}

export default LoginPage