import React, {type FC, useState} from 'react';
import classes from '../../styles/App.module.scss';
import Header from '../../UI/Header';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetAllVideosQuery, useGetUserVideosQuery } from '../../services/appApi';

const App: FC = ():JSX.Element => {
	const [page, setPage] = useState(1);
	const user = useAppSelector(state => state.user);

	const {data, isLoading, isError} = useGetUserVideosQuery(page, {
		skip: user.name ? false : true
	});

	// const {data, isLoading, isError} = useGetAllVideosQuery(page, {
	// 	skip: user.name ? false : true
	// });

	return (
		<div style={{
			height: '100%',
			width: '100%'
		}}>
			<Header/>
			<div className={classes.App}>
				<div className={classes.AppWrapper}>
					<main className={classes.Main}>
						<section>Типа загруженные видосы</section>
						<section>Типа все видосы</section>
					</main>
				</div>
			</div>
		</div>
	);
};

export default App;