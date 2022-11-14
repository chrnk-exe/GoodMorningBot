import React from 'react';
import classes from '../styles/Header.module.sass';
import { Button } from '@mui/material';
import { useAppSelector } from '../hooks/useAppSelector';
import UserDropDownMenu from './UserDropDownMenu';

const Header = () => {
	const user = useAppSelector(state => state.user);
	console.log(user);
	const logout = () => {
		window.localStorage.clear();
		window.location.reload();
	};

	const userNameHandler = (user: User) => {
		if (user.firstName && user.firstName !== '')
			return user.firstName + ' ' + user.secondName;
		if (user.userName && user.userName !== '')
			return user.userName;
		else return user.email;
	};

	return (
		<div className={classes.header}>
			<section>
				<UserDropDownMenu
					name={userNameHandler(user)}
					Role={user.Role}
					avatarURL={user.avatarURL}
				/>
			</section>
			<section>
				<Button variant="contained" onClick={logout} size="large">
					Log out
				</Button>
			</section>
		</div>
	);
};

export default Header;
