import React, {type FC, useState} from 'react';
import { Paper, Box, Typography, Modal, Fade, Button } from '@mui/material';
import classes from '../../styles/VideoItem.module.sass';
import useAppGetVideoQuery from '../../hooks/vkApi/useAppGetVideoQuery';
import Loader from '../../UI/Loader';
import isGroup from '../../typeguards/isGroup';
import ViewsIcon from '@mui/icons-material/Visibility';
import LikeIcon from '@mui/icons-material/ThumbUp';
import RepostIcon from '@mui/icons-material/Reply';


interface Props {
	videoItem: GetVideoResponse.AppResponse
}
const VideoItem: FC<Props> = ({videoItem}) => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
					<img src={author.photo_200} alt='' />
					<a target={'_blank'} href={author.url} rel="noreferrer">{author.name}
					</a>
				</Box>
			);
		} else {
			return (				
				<Box display='flex'>
					<a target={'_blank'} href={author.url} rel="noreferrer">{author.firstName + ' ' + author.secondName}</a>
				</Box>);
		}
	};

	const infoBarItems = [
		{
			icon: <ViewsIcon sx={{height: '23px'}}/>,
			title: 'views',
			data: views
		},
		{
			icon: <RepostIcon sx={{height: '23px'}}/>,
			title: 'reposts',
			data: reposts
		},
		{
			icon: <LikeIcon sx={{height: '23px'}}/>,
			title: 'likes',
			data: reposts
		}
	];

	return (
		<Box
			sx={{
				// border: '1px solid gray',
				p: 1,
				width: '24%',
				height: '215px'
			}}
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
			alignItems="center">
			<Box className={classes.VideoCardCover} sx={{cursor: 'pointer'}} onClick={handleOpen}>
				<div className={classes.VideoCardBackground}>
					<img className={classes.VideoCardImage} src={image} height={100} width={70} alt={image} />
				</div>
				<Typography>{getDuration(duration)}</Typography>
			</Box>
			<Box sx={{width: '100%', pl: 1, pr: 1}}>
				<Typography>{title}</Typography>
				{getAuthor(author)}
				<Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={1} sx={{fontSize: '0.8em'}}>
					{
						infoBarItems.map((item, index) => (
							<Box key={index}
								sx={{
									opacity: '0.5',
								}}
								display={'flex'}
								justifyContent={'flex-start'}
								alignItems={'center'}>
								{item.icon}<Typography fontSize={'1em'} paddingLeft={'3px'}>{item.data}</Typography>
							</Box>
						))
					}
				</Box>
			</Box>

			<Modal open={open} onClose={handleClose} sx={{
				'&:focus':{
					border: 'none',
					outline: 'none'
				}
			}}>
				<Fade in={open}>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="flexStart"
						sx={{
							position: 'absolute' as const,
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '75%',
							height: '75%',
							border: '2px solid #fff',
							bgcolor: '#FFF',
							zIndex: '9999999',
						}}>
						<Box sx={{height: '100%', width: '100%'}}>
							<iframe src={video} style={{
								height: '100%',
								width: '100%',
								border: 'none',
								outline: 'none'
							}}/>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</Box>
	);
};

export default VideoItem;
