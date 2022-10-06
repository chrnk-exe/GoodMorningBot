import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import Button from '@mui/material/Button';
import Header from '../../UI/Header';
import classes from '../../styles/Settings.module.scss';
import { Paper, TextField } from '@mui/material';
import anon from '../../assets/anon.jpg';

const Settings = () => {
	const user = useAppSelector(state => state.user);
	const [settings, setSettings] = useState({
		email: user.name || ''
	});

	return (
		<div style={{
			height: '100%',
			width: '100%'
		}}>
			<Header/>
			<div className={classes.settingsApp}>
				<Paper elevation={10}>
					<div className={classes.settingsContainer}>
						<section className={classes.settingContainerChild}>
							<img src={user.avatarURL || anon} height={350} alt=''/>
							<Button fullWidth disabled={user.vkID === -1}> Change Avatar </Button>
							<p>User ID: {user.vkID === -1 ? user.userID : user.vkID}</p>
						</section>
						<section className={classes.settingContainerChild}>
							<TextField helperText={user.activated ? '' : 'Confirm email!'} value={settings.email} onChange={e => setSettings(prev => ({...prev, email: e.target.value}))}/>
						</section>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default Settings;