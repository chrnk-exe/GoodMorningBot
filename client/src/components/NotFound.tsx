import React, { useEffect, useState } from 'react';
// import { useAppSelector } from '../app/hooks';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import classes from '../styles/NotFound.module.sass';

const NotFound = () => {
	const [timer, setTime] = useState(5);
	// const user = useAppSelector(state => state.user);
    
	// if(user.userID !== -1){
        
	// }

	const startTimer = () => {
		let timeleft = timer;
		const MyTimer = setInterval(() => {
			timeleft -= 1;
			if(timeleft === 0)clearInterval(MyTimer);
			setTime(timeleft);
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
					timer === 0 ? <Navigate to={'/login'} replace/> : null
				}  
				<Link replace to={'/login'}>Click here to redirect now</Link>                 
			</div>
		</div>
	);
};

export default NotFound;