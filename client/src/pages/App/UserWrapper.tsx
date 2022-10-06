import React, { useState } from 'react';
import { useGetUserVideosQuery } from '../../services/appApi';
import VideoAccordion from './VideoAccordion';
import { Pagination } from '@mui/material';
import Loader from '../../UI/Loader';

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
			<h2>Your videos</h2>
			<VideoAccordion videos={data} />
		</div>
	);
};

export default UserWrapper;
