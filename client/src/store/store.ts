import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import { userApi } from './services/authApi';
import { appApi } from './services/appApi';
import { vkApi } from './services/vkApi';


export const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		[userApi.reducerPath]: userApi.reducer,
		[appApi.reducerPath]: appApi.reducer,
		[vkApi.reducerPath]: vkApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(userApi.middleware)
			.concat(appApi.middleware)
			.concat(vkApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
