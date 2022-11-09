import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import classes from '../styles/UserDropDownMenu.module.sass';
import anonJPG from '../assets/anon.jpg';
import { Button, ButtonGroup, Paper, Divider } from '@mui/material';
import { ClickAwayListener } from '@mui/material';


const UserDropDownMenu = ({name, Role, avatarURL}: {name: string | null, Role: number, avatarURL: string | null}) => {
	const [dropDown, setDropDown] = useState(false);
	const navigate = useNavigate();

	const RoleHandler = (Role: number) => {
		if(Role === 0) return 'Необходимо подтверждение почты!';
		if(Role === 1) return 'Role: User';
		if(Role === 2) return 'Role: Admin';
		else return 'user role error';
	};

	return (
		<div className={classes.UserDropDownMenu}>
			<img onClick={()=>setDropDown(prev => !prev)} height={40} width={40} src={avatarURL ? avatarURL : anonJPG} alt='avatar'/>
			{
				dropDown && 
				<ClickAwayListener onClickAway={()=>setDropDown(false)}>
					<div className={classes.dropDownMenu}>
						<Paper className={classes.Paper} elevation={10}>
							<ButtonGroup variant='text' orientation="vertical">
								<Button onClick={() => navigate('/settings')}>Settings</Button>
								<Button>Bug report</Button>
								<Divider />
								<Button>Log out</Button>
							</ButtonGroup>
						</Paper>
					</div>
				</ClickAwayListener>

			}
			<div className={classes.userInfo}>
				<p>Name: {name}</p>
				<p style={{color: Role === 0 ? 'red' : undefined}}>{RoleHandler(Role)}</p>
			</div>
		</div>
	);
};

export default UserDropDownMenu;