import React, {FC} from 'react';
import classes from '../../styles/App.module.scss';
import Header from '../../UI/Header';
import { useGetVideosQuery } from '../../services/appApi';

const App: FC = ():JSX.Element => {

	const {data, isLoading, isError} = useGetVideosQuery(1);
	const fetchapi = async () => {
		const resp = await fetch('http://localhost:5000/api/videos');
		console.log(resp);
	};

	return (
		<div>
			<Header></Header>
			<div className={classes.App}>
				MainApp
				<button onClick={fetchapi}>Button</button>
			</div>
		</div>
	);
};

export default App;