import React from 'react';
import { Box } from '@mui/material';
import UserProfile from './UserProfile';

const NavigationBar = () => {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center">
			<UserProfile />
			<Box>
				Navigation
			</Box>
		</Box>
	);
};

export default NavigationBar;
