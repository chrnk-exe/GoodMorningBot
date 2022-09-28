import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import './styles/index.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	</Provider>
);

