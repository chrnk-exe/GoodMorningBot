import React, { type FC } from 'react';
import classes from '../../styles/App.module.sass';
import Header from '../../UI/Header';
import AllWrapper from './AllWrapper';
import UserWrapper from './UserWrapper';

const App: FC = (): JSX.Element => {

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
			}}>
			<Header />
			<div className={classes.App}>
				<div className={classes.AppWrapper}>
					<main className={classes.Main}>
						<UserWrapper />
						<div className={classes.divider} />
						<AllWrapper />
					</main>
				</div>
			</div>
		</div>
	);
};

export default App;
