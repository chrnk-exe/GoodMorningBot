import React from 'react';
import classes from '../styles/UserDropDownMenu.module.scss';

const UserDropDownMenu = ({Role}: {Role: string}) => {
	return (
		<div className={classes.UserDropDownMenu}>
			<img height={40} width={40} src={undefined} alt='avatar'/>
			<p>{Role}</p>
		</div>
	);
};

export default UserDropDownMenu;