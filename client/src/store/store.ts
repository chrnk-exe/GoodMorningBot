import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import authReducer from '../reducers/authReducer';
import { userApi } from '../services/userApi';
import { appApi } from '../services/appApi';

export const store = configureStore({
	reducer: {
		user: userReducer,
		auth: authReducer,
		[userApi.reducerPath]: userApi.reducer,
		[appApi.reducerPath]: appApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware).concat(appApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
