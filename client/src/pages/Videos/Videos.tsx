import React, { type FC, useState } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
// import Header from '../../UI/Header';
import VideosWrapper from './VideosWrapper';


type videoState = 'user' | 'all'

const Videos: FC = (): JSX.Element => {
	const [pageState, setPageState] = useState<videoState>('all');

	return (
		<Box
			sx={{
				height: '100%',
				width: '100%',
				p: 1
			}}>
			<Select sx={{bgcolor: '#FFFFFF'}}
				value={pageState}
				onChange={(e) => setPageState(e.target.value as videoState)}>
				<MenuItem value={'user' as videoState}>
					Your Videos
				</MenuItem>
				<MenuItem value={'all' as videoState}>
					App
				</MenuItem>
			</Select>
			<Box display="flex" >
				<VideosWrapper />
			</Box>
		</Box>
	);
};

export default Videos;
