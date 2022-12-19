import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Box, Avatar, Typography } from '@mui/material';
import anon from '../assets/anon.jpg';

const UserProfile = () => {
	const user = useAppSelector(state => state.user);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection={'column'}
			gap={1}
			sx={{
				borderTop: '1px solid lightgrey',
				borderBottom: '1px solid lightgrey',
				py: 2,
				width: '80%',
				ml: '10%'
			}}>
			<Avatar
				src={user.avatarURL || anon}
				sx={{ height: 70, width: 70 }}
				alt=""
			/>
			<Typography>
				{user.userName || `${user.firstName} ${user.secondName}`}
			</Typography>
			<Typography>
				{[
					'Needs Activation',
					'User',
					'Admin'
				][user.Role]}
			</Typography>
		</Box>
	);
};

export default UserProfile;
