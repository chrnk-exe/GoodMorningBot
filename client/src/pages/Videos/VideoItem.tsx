import React, {type FC} from 'react';
import { Paper, Box } from '@mui/material';
import classes from '../../styles/VideoItem.module.sass';
import useAppGetVideoQuery from '../../hooks/vkApi/useAppGetVideoQuery';
import Loader from '../../UI/Loader';
import isGroup from '../../typeguards/isGroup';


interface Props {
	videoItem: GetVideoResponse.AppResponse
}
const VideoItem: FC<Props> = ({videoItem}) => {
	const {
		duration,
		image,
		first_frame,
		video,
		views,
		likes,
		reposts,
		author,
		id,
		title
	} = videoItem;

	const getDuration = (duration: number): string => {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes}:${seconds}`;
	};

	const getAuthor = (author: GetVideoResponse.GroupAuthor | GetVideoResponse.ProfileAuthor): JSX.Element => {
		if(isGroup(author)){
			return (
				<Box display='flex'>
					<img src={author.photo_200} alt='' /><a target={'_blank'} href={author.url} rel="noreferrer">{author.name}</a>
				</Box>
			);
		} else {
			return (				
				<Box display='flex'>
					<a target={'_blank'} href={author.url} rel="noreferrer">{author.firstName + ' ' + author.secondName}</a>
				</Box>);
		}
	};

	return (
		<Box
			sx={{
				border: '1px solid gray'
			}}
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center">
			<Box className={classes.VideoCardCover}>
				<img src={image} height={100} width={70} alt={image} />
				<p>{getDuration(duration)}</p>
			</Box>
			<Box>
				<p>{title}</p>
				{getAuthor(author)}
			</Box>
		</Box>
	);
};

export default VideoItem;
