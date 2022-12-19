import React, {type FC} from 'react';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {useAppSelector} from '../hooks/useAppSelector';
import UserProfile from './UserProfile';
import {useNavigate} from 'react-router';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';

interface Props {
	open: boolean
}
const NavigationBar: FC<Props> = ({open}) => {
	const user = useAppSelector(state => state.user);

	const NavigationList = [
		{
			text: 'Main Page',
			link: '/app',
			icon: <DescriptionIcon/>
		},
		{
			text: 'Videos',
			link: '/app/videos',
			icon: <VideoSettingsIcon/>
		},
		{
			text: 'Bot commands',
			link: '/app/bot',
			icon: <SmartToyIcon/>
		},
		{
			text: 'Settings',
			link: '/app/settings',
			icon: <SettingsIcon/>
		},
	];

	const navigate = useNavigate();

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center">
			<Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{width: '100%'}}>
				<Collapse in={open} sx={{width: '100%'}}>
					<UserProfile />
				</Collapse>
			</Box>
			<Box sx={{width: '100%'}}>
				<List sx={{width: '100%'}}>
					{
						NavigationList.map((item, index) => (
							<ListItem key={item.link} sx={{px: !open ? 0 : undefined}}>
								<ListItemButton onClick={() => navigate(item.link)}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText>{item.text}</ListItemText>
								</ListItemButton>
							</ListItem>
						))
					}
					{
						user.Role === 2 &&
						<ListItem sx={{px: !open ? 0 : undefined}}>
							<ListItemButton onClick={() => navigate('/app/users')}>
								<ListItemIcon><GroupIcon/></ListItemIcon>
								<ListItemText>Users</ListItemText>
							</ListItemButton>
						</ListItem>
					}
				</List>
			</Box>
		</Box>
	);
};

export default NavigationBar;
