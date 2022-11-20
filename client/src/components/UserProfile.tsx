import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Box, Avatar } from '@mui/material';
import anon from '../assets/anon.jpg';

const UserProfile = () => {
	const user = useAppSelector(state => state.user);
	console.log(user);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{
				borderTop: '1px solid lightgrey',
				borderBottom: '1px solid lightgrey',
				py: 2,
				width: '80%'
			}}>
			<Avatar
				src={user.avatarURL || anon}
				sx={{ height: 60, width: 60 }}
				alt=""
			/>
		</Box>
	);
};

export default UserProfile;
