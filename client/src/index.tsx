import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import './styles/index.scss';
import { ThemeProvider } from '@mui/material';
import appTheme from './styles/theme';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<ThemeProvider theme={appTheme}>
		<Provider store={store}>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</Provider>
	</ThemeProvider>

);

