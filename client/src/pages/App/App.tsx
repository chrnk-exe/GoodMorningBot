import React, { type FC } from 'react';
import classes from '../../styles/App.module.sass';
// import {B}
import { Box, ListItem, List, ListItemText } from '@mui/material';
import Typography from '@mui/material/Typography';
// import Header from '../../UI/Header';


const App: FC = (): JSX.Element => {

	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			gap={1}
			sx={{
				height: '100%',
				width: '100%',
				p: 2,
				fontSize: '1.2em',
			}}>
			<Typography variant={'h3'}>
				Main Page
			</Typography>
			<Typography variant={'h5'}>
				This site is created to manage your own content for a cool bot created for congratulations on good morning!
			</Typography>
			<Typography variant={'h4'}>
				Roadmap:
			</Typography>
			<List sx={{listStyleType: 'space-counter;'}}>
				<ListItem>
					<ListItemText>Main page</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>Video Content Management page</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>Test Bot buttons!</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>Settings and statistics!</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>All users management (For admin users)</ListItemText>
				</ListItem>
			</List>
		</Box>
	);
};

export default App;
