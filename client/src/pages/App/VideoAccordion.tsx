import React from 'react';
import { Paper, Box } from '@mui/material';
// import classes from '../../styles/VideoAccordion.module.sass';
import VideoItem from './VideoItem';

const VideoAccordion = ({
	videos,
}: {
	videos: IVideosResponse | undefined;
}) => {
	return (
		<Box
			component={Paper}
			sx={{
				height: '100%',
				overflowY: 'hidden',
				gap: '10px',
				margin: '10px',
				padding: '10px',
			}}
			display="flex"
			justifyContent="space-evenly"
			alignItems="flex-start"
			flexWrap="wrap">
			{videos ? (
				videos.response.map(video => (
					<VideoItem
						key={videos.response.indexOf(video)}
						content={video}
					/>
				))
			) : (
				<div>List is empty</div>
			)}
		</Box>
	);
};

export default VideoAccordion;
