import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../services/authApi';
import { appApi } from '../services/appApi';
import { vkApi } from '../services/vkApi';

const initialState: User = {
	userID: -1,
	Role: 0,
	activated: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			return action.payload;
		},
		setAvatar: (state, action: PayloadAction<string>) => {
			state.avatarURL = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				userApi.endpoints.loginUser.matchFulfilled,
				(state, action) => {
					// console.log('consolelog from userreducer');
					const { id, email, isAdmin, activated, avatarURL} = action.payload;
					return {
						userID: id,
						email: email,
						Role: isAdmin ? 2 : activated ? 1 : 0,
						avatarURL,
						activated,
					};
				},
			)
			.addMatcher(
				appApi.endpoints.authorize.matchFulfilled,
				(state, action) => {
					// console.log('consolelog from userreducer');
					const { id, email, isAdmin, activated, avatarURL } = action.payload;
					return {
						email: email,
						Role: +isAdmin + +activated,
						avatarURL,
						userID: id,
						activated,
					};
				},
			)
			.addMatcher(
				userApi.endpoints.newUser.matchFulfilled,
				(state, action) => {
					// console.log('consolelog from userreducer');
					const { id, email, isAdmin, activated, avatarURL } = action.payload;
					return {
						userID: id,
						email: email,
						Role: +isAdmin + +activated,
						avatarURL,
						activated,
					};
				},
			)
			.addMatcher(
				userApi.endpoints.getUserByVk.matchFulfilled,
				(state, action) => {
					const { id, email, isAdmin, activated, avatarURL } = action.payload;
					return {
						userID: id,
						name: email,
						Role: isAdmin ? 2 : activated ? 1 : 0,
						avatarURL,
						activated,
					};
				},
			)
			.addMatcher(
				vkApi.endpoints.getUser.matchFulfilled,
				(state, action) => {
					const {id, first_name, last_name, photo_50, nickname} = action.payload;
					console.log(action.payload);
					return {
						...state,
						userID: id,
						firstName: first_name,
						secondName: last_name,
						userName: nickname,
						avatarURL: photo_50
					};
				}
			);
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
