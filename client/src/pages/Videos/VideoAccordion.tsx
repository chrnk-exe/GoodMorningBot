import React, {type FC} from 'react';
import { Paper, Box } from '@mui/material';
// import classes from '../../styles/VideoAccordion.module.sass';
import VideoItem from './VideoItem';
import { Pagination } from '@mui/material';

interface Props {
	page: number;
	setPage(p: number): void
	videos?: GetVideoResponse.AppResponse[];
	maxPages?: number
}

const VideoAccordion: FC<Props> = ({
	videos,
	page,
	setPage,
	maxPages
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
			flexDirection={'column'}
			justifyContent="center"
			alignItems="center">
			<Box
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
					<Box>List is empty</Box>
				)}
			</Box>

			<Pagination
				variant="outlined"
				color="secondary"
				size="large"
				page={page}
				onChange={(e, p) => setPage(p)}
				count={Math.floor((maxPages || 10) / 10)}
			/>
		</Box>
	);
};

export default VideoAccordion;
