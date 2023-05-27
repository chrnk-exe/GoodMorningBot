import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import classes from '../styles/NotFound.module.sass';

const NotFound = () => {

	const [timer, setTime] = useState(5);

	const startTimer = () => {
		let timeout = timer;
		const MyTimer = setInterval(() => {
			timeout -= 1;
			if(timeout === 0)clearInterval(MyTimer);
			setTime(timeout);
		}, 1000);
	};

	useEffect(() => {   
		startTimer();
	}, []);

	return (
		<div className={classes.notFoundPage}>
			<div>
				<CircularProgress size={140} color="secondary" variant="determinate" value={timer * 20}/>
				<div className={classes.notFoundMessage}>Page not found. Redirect in: {timer} seconds</div>
				{
					timer === 0 ? <Navigate to={'/'} replace/> : null
				}  
				<Link replace to={'/'}>Click here to redirect now</Link>
			</div>
		</div>
	);
};

export default NotFound;