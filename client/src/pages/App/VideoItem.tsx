import React from 'react';
import { Paper, Box } from '@mui/material';
import classes from '../../styles/VideoItem.module.sass';
import useAppGetVideoQuery from '../../hooks/vkApi/useAppGetVideoQuery';
import Loader from '../../UI/Loader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

const VideoItem = ({ content }: { content: string }) => {
 
	return (
		<Box>
			<Paper className={classes.VideoCardCover}>{content}</Paper>
		</Box>
	);
};

export default VideoItem;
