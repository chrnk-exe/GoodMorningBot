import React, {useState} from 'react'
import classes from '../styles/LoginPage.module.css'
import { TextField, Button } from '@mui/material'
import vkicon from '../assets/vk-icon.svg'
import { Link } from 'react-router-dom'

enum loginPageState {
    LOGIN = 'Вход',
    REGISTRATION = 'Регистрация'
}

const LoginPage = () => {
    const [pageState, setPageState] = useState(loginPageState.LOGIN)

    const oauthWithVk = () => {
        alert('Coming soon!')
    }

    return (
        <div className={classes.loginPage}>
            <div className={classes.loginPageContainer}>
                <h2 className={classes.loginPageItem}>{pageState}</h2>
                <div className={classes.loginPageItem} >
                    <TextField style={{width:'100%'}} label="Email" variant="outlined" />
                </div>
                <div className={classes.loginPageItem} >
                    <TextField style={{width:'100%'}} label="Пароль" variant="outlined" type={'password'}/>
                </div>
                <div className={[classes.loginPageItem, classes.passwordRecoveryPage].join(' ')}><Link to={'/recovery'} replace>Забыли пароль?</Link></div>
                <div className={classes.loginPageItem} >
                    <Button 
                        size="large"
                        style={{width:'100%'}}
                        variant="outlined" 
                        color={'secondary'}>
                            {pageState}
                    </Button>
                </div>
                <div className={classes.loginPageItem} >
                    <Button 
                        style={{width:'100%'}}
                        size="large"
                        onClick={() => setPageState(pageState === loginPageState.LOGIN ? loginPageState.REGISTRATION : loginPageState.LOGIN)}
                        variant="outlined">
                            {pageState === loginPageState.LOGIN ? 'Зарегистрироваться' : 'Авторизация'}
                    </Button>
                </div>
                <img onClick={oauthWithVk} className={[classes.vkIcon, classes.loginPageItem].join(' ')} width={50} height={50} src={vkicon} alt=''/>
            </div>
        </div>
    )
}

export default LoginPage