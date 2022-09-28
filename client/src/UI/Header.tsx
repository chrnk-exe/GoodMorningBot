import React from 'react';
import classes from '../styles/Header.module.scss';
// import { useAppSelector } from '../hooks/useAppSelector';
// import UserDropDownMenu from './UserDropDownMenu';

const Header = () => {
	// const user = useAppSelector(state => state.user);
	return (
		<div className={classes.header}>
			<section>
				{/* <UserDropDownMenu Role={user.Role}/> */}
			</section>
			<section>
				Log out
			</section>
		</div>
	);
};

export default Header;