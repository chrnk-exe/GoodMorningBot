import React from 'react';
import { Paper, Box } from '@mui/material';
// import classes from '../../styles/VideoAccordion.module.sass';
import VideoItem from './VideoItem';
import { Pagination } from '@mui/material';



const VideoAccordion = ({
	videos,
	page,
	setPage
}: {
	page: number;
	setPage(p: number): void
	videos?: GetVideoResponse.AppResponse[];
}) => {
	return (
		<Box
			component={Paper}
			sx={{
				height: '100%',
				overflowY: 'scroll',
				gap: '10px',
				margin: '10px',
				padding: '10px',
			}}
			display="flex"
			justifyContent="flex-start"
			alignItems="flex-start"
			flexWrap="wrap">
			{videos ? (
				videos.map(video => (
					<VideoItem
						key={video.id}
						videoItem={video}
					/>
				))
			) : (
				<div>List is empty</div>
			)}
			<Pagination
				variant="outlined"
				color="secondary"
				size="large"
				page={page}
				onChange={(e, p) => setPage(p)}
				count={10}
			/>
		</Box>
	);
};

export default VideoAccordion;
