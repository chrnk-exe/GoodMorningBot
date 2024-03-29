import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { appApi } from '../services/appApi';

const initialState: IVideoState = {
	all: [],
	user: []  
};


export const videoSlice = createSlice({
	name: 'videos',
	initialState,
	reducers: {
		setVideos: (state, action: PayloadAction<IVideoState>) => {
			return action.payload;
		}
	}, 
	extraReducers: (builder) => {
		builder
			.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
				console.log('consolelog from videoreducer');
				console.log(action.payload);
			})
			.addMatcher(appApi.endpoints.authorize.matchFulfilled, (state, action: PayloadAction<ILoginResponse>) => {
				console.log('consolelog from videoreducer');
				console.log(action.payload);
			});
	}
});
