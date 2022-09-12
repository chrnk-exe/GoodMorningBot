import React, {useState} from 'react'
import classes from '../styles/LoginPage.module.scss'
import { TextField, Button } from '@mui/material'
import TextFieldPassword from '../UI/TextFieldPassword'
import vkicon from '../assets/vk-icon.svg'
import { Link, useNavigate } from 'react-router-dom'
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

    const navigator = useNavigate()

    const oauthWithVk = () => {
        alert('Coming soon!')
    }

    const authWithLogin = async () => {
        console.log(userState)
        const response: AxiosResponse<LoginResponse> = await axios.post('http://localhost:5000/api/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                login: userState.login,
                password: userState.password
            }
        })
        if(response.data.auth && response.data.activated){
            navigator('/app', {replace: true})
        }
    }

    const registerNewUser = async () => {
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