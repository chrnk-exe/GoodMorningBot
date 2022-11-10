import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {userApi} from '../services/authApi';
import { appApi } from '../services/appApi';
import { vkApi } from '../services/vkApi';

const initialState: {
	token: string,
	clientKey: string | null
} = {
	token: window.localStorage.getItem('token') || '',
	clientKey: null
};

export const tokenSlice = createSlice({
	name: 'jwt-token',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>): void => {
			window.localStorage.setItem('token', action.payload);
			state.token = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action): void => {
				const {token, clientKey} = action.payload;
				console.log(action.payload);
				if(token){
					// window.localStorage.setItem('clientKey', clientKey);
					window.localStorage.setItem('token', token);
					state.token = token;
					state.clientKey = clientKey;
				}
			})
			.addMatcher(userApi.endpoints.newUser.matchFulfilled, (state, action): void => {
				const {token, clientKey} = action.payload;
				console.log(action.payload);
				if(token){
					// window.localStorage.setItem('clientKey', clientKey);
					window.localStorage.setItem('token', token);
					state.token = token;
					state.clientKey = clientKey;
				}
			})
			.addMatcher(appApi.endpoints.authorize.matchFulfilled, (state, action) => {
				const {clientKey} = action.payload;
				if(clientKey){
					// window.localStorage.setItem('clientKey', clientKey);
					state.clientKey = clientKey;
				}
			})
			.addMatcher(vkApi.endpoints.getClientKey.matchFulfilled, (state, action) => {
				if(action.payload.clientKey){
					state.clientKey = action.payload.clientKey;
				}
			})
			.addMatcher(userApi.endpoints.getUserByVk.matchFulfilled, (state, action) => {
				console.log(action.payload);
			});
	}
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;