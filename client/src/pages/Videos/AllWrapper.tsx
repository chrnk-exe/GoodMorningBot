import React, { useState } from 'react';
import { useGetAllVideosQuery } from '../../store/services/appApi';
import useAppGetVideosQuery from '../../hooks/vkApi/useAppGetVideosQuery';
import VideoAccordion from './VideoAccordion';
import Loader from '../../UI/Loader';
import classes from '../../styles/wrappers.module.sass';



const AllWrapper = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetAllVideosQuery(page);

	const Videos = useAppGetVideosQuery(data?.response.map(item => item.data));
	console.log(Videos.data);

	if (isLoading) return <Loader />;

	return (
		<div

			style={{
				width: '100%',
				height: 'max-content',
				minHeight: '100%'
			}}>
			<h2 className={classes.header}>All videos</h2>
			<VideoAccordion videos={Videos.data} page={page} setPage={setPage}/>
		</div>
	);
};

export default AllWrapper;
