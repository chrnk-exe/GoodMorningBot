import React, { useState } from 'react';
import { useGetUserVideosQuery } from '../../store/services/appApi';
import VideoAccordion from './VideoAccordion';
import { Pagination } from '@mui/material';
import Loader from '../../UI/Loader';
import classes from '../../styles/wrappers.module.sass';

const UserWrapper = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetUserVideosQuery(page);

	if (isLoading) return <Loader />;

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
			}}>
			<h2 className={classes.header}>Your videos</h2>
			<VideoAccordion videos={data} />
		</div>
	);
};

export default UserWrapper;
