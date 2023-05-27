import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {authApi} from '../services/authApi';
import { appApi } from '../services/appApi';

const initialState: {
	token: string,
	clientKey: string | null,
	access_token: string | null
} = {
	token: window.localStorage.getItem('token') || '',
	clientKey: null,
	access_token: null
};


export const tokenSlice = createSlice({
	name: 'tokens',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>): void => {
			window.localStorage.setItem('token', action.payload);
			state.token = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action): void => {
				const {token, clientKey} = action.payload;
				console.log(action.payload);
				if(token){
					// window.localStorage.setItem('clientKey', clientKey);
					window.localStorage.setItem('token', token);
					state.token = token;
					state.clientKey = clientKey;
				}
			})
			// .addMatcher(authApi.endpoints.newUser.matchFulfilled, (state, action): void => {
			// 	const {token, clientKey} = action.payload;
			// 	console.log(action.payload);
			// 	if(token){
			// 		// window.localStorage.setItem('clientKey', clientKey);
			// 		window.localStorage.setItem('token', token);
			// 		state.token = token;
			// 		state.clientKey = clientKey;
			// 	}
			// })
			.addMatcher(appApi.endpoints.authorize.matchFulfilled, (state, action) => {
				const {clientKey, access_token} = action.payload;
				if(clientKey){
					// window.localStorage.setItem('clientKey', clientKey);
					state.clientKey = clientKey;
				}
				if(access_token){
					state.access_token = access_token;
				}
			})
			.addMatcher(authApi.endpoints.getClientKey.matchFulfilled, (state, action) => {
				if(action.payload.clientKey){
					state.clientKey = action.payload.clientKey;
				}
			})
			.addMatcher(authApi.endpoints.getUserByVk.matchFulfilled, (state, action) => {
				const { token, access_token } = action.payload;
				if(token){
					window.localStorage.setItem('token', token);
					state.token = token;
				}
				if(access_token){
					state.access_token = access_token;
				}
				console.log(action.payload);
			});
	}
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;