import React, { useState } from 'react';
import { useGetAllVideosQuery } from '../../services/appApi';
import VideoAccordion from './VideoAccordion';
import { Pagination } from '@mui/material';
import Loader from '../../UI/Loader';

const AllWrapper = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetAllVideosQuery(page);

	if (isLoading) return <Loader />;

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
			}}>
			<h2>All videos</h2>
			<VideoAccordion videos={data} />
		</div>
	);
};

export default AllWrapper;
