import React from 'react';
import { Paper } from '@mui/material';
import classes from '../../styles/VideoAccordion.module.sass';
import VideoItem from './VideoItem';

const VideoAccordion = ({videos} : {videos: IVideos[] | undefined}) => {
	return (
		<Paper className={classes.content} elevation={10}>
			{
				videos
					? videos.map(video => <VideoItem key={video.id} content={video.vkcontent} id={video.id}/>)
					: <div>List is empty</div>
			}
		</Paper>
	);
};

export default VideoAccordion;
