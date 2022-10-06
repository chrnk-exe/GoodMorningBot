import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {userApi} from '../services/userApi';

const initialState = window.localStorage.getItem('token') || '';

export const tokenSlice = createSlice({
	name: 'jwt-token',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>): string => {
			window.localStorage.setItem('token', action.payload);
			return action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action): string => {
				const token = action.payload.token;
				if(token){
					window.localStorage.setItem('token', action.payload.token);
					return action.payload.token;
				} else return '';
			})
			.addMatcher(userApi.endpoints.newUser.matchFulfilled, (state, action): string => {
				const token = action.payload.token;
				if(token){
					window.localStorage.setItem('token', action.payload.token);
					return action.payload.token;
				} else return '';
			});
	}
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;