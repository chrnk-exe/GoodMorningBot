import React, { type FC } from 'react';
import classes from '../../styles/App.module.sass';
import { Box } from '@mui/material';
// import Header from '../../UI/Header';
import AllWrapper from './AllWrapper';

const App: FC = (): JSX.Element => {

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
			}}>
			{/* <Header /> */}
			<div className={classes.App}>
				<div className={classes.AppWrapper}>
					<Box display="flex" >
						<AllWrapper />
					</Box>
				</div>
			</div>
		</div>
	);
};

export default App;
