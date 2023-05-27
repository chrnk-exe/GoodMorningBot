import React, { useState } from 'react';
import {Navigate} from 'react-router';
import { useAppSelector } from '../../hooks/useAppSelector';
import Button from '@mui/material/Button';
import classes from '../../styles/Settings.module.sass';
import { Paper, TextField } from '@mui/material';
import anon from '../../assets/anon.jpg';


const Settings = () => {
	const user = useAppSelector(state => state.user);
	const [settings, setSettings] = useState({
		email: user.email || '',
		password1: '',
		password2: '',
	});

	if(user.userID < 0) return (<Navigate to='/login' />);

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
			}}>
			<div className={classes.settingsApp}>
				<Paper elevation={10}>
					<div className={classes.settingsContainer}>
						<section className={classes.settingContainerChild}>
							<img
								src={user.avatarURL || anon}
								height={250}
								alt=""
							/>
							<Button
								variant="contained"
								fullWidth
								disabled={user.userID === -1}>
								Change Avatar
							</Button>
							<p>
								User ID:{' '}
								{user.userID}
							</p>
						</section>
						<section className={classes.settingContainerChild}>
							<TextField
								label={'Email'}
								value={settings.email}
								onChange={e =>
									setSettings(prev => ({
										...prev,
										email: e.target.value,
									}))
								}
							/>
						</section>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default Settings;
