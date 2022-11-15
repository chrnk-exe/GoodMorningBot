import React, { useState } from 'react';
import { useGetAllVideosQuery } from '../../store/services/appApi';
import useAppGetVideosQuery from '../../hooks/vkApi/useAppGetVideosQuery';
import VideoAccordion from './VideoAccordion';
import { Pagination } from '@mui/material';
import Loader from '../../UI/Loader';
import classes from '../../styles/wrappers.module.sass';


const AllWrapper = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetAllVideosQuery(page);

	const Videos = useAppGetVideosQuery(data?.response);
	console.log(Videos.data, Videos.error);

	if (isLoading) return <Loader />;

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
			}}>
			<h2 className={classes.header}>All videos</h2>
			<VideoAccordion videos={data} />
		</div>
	);
};

export default AllWrapper;
