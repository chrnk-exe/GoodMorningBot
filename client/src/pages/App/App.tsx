import React, {FC} from 'react';
import classes from '../../styles/App.module.scss';
import Header from '../../UI/Header';

const App: FC = ():JSX.Element => {

	return (
		<div>
			<Header></Header>
			<div className={classes.App}>
				MainApp
				<button>Button</button>
			</div>
		</div>
	);
};

export default App;