import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {userApi} from '../services/userApi';

export const tokenSlice = createSlice({
	name: 'jwt-token',
	initialState: window.localStorage.getItem('token') ,
	reducers: {
		setToken: (state, action: PayloadAction<string>): string => {
			return action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action) => {
				console.log('userApi fullfilled');
				// state = action.payload.token;
				window.localStorage.setItem('token', action.payload.token);
				return action.payload.token;
			});
	}
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;