import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { appApi } from '../services/appApi';
import { vkApi } from '../services/vkApi';

const initialState: User = {
	userID: -1,
	Role: 0
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
				authApi.endpoints.loginUser.matchFulfilled,
				(state, action) => {
					// console.log('consolelog from userreducer');
					const { id, email, isAdmin, avatarURL} = action.payload;
					return {
						userID: id,
						email: email,
						Role: +isAdmin + 1,
						avatarURL,
					};
				},
			)
			.addMatcher(
				appApi.endpoints.authorize.matchFulfilled,
				(state, action) => {
					// console.log('consolelog from userreducer');
					const { id, email, isAdmin, avatarURL } = action.payload;
					return {
						email: email,
						Role: +isAdmin + 1,
						avatarURL,
						userID: id,
					};
				},
			)
			// .addMatcher(
			// 	authApi.endpoints.newUser.matchFulfilled,
			// 	(state, action) => {
			// 		// console.log('consolelog from userreducer');
			// 		const { id, email, isAdmin, activated, avatarURL } = action.payload;
			// 		return {
			// 			userID: id,
			// 			email: email,
			// 			Role: +isAdmin + +activated,
			// 			avatarURL,
			// 			activated,
			// 		};
			// 	},
			// )
			.addMatcher(
				authApi.endpoints.getUserByVk.matchFulfilled,
				(state, action) => {
					const { id, email, isAdmin, avatarURL } = action.payload;
					return {
						userID: id,
						name: email,
						Role: +isAdmin + 1,
						avatarURL,
					};
				},
			)
			.addMatcher(
				vkApi.endpoints.getUser.matchFulfilled,
				(state, action) => {
					const {id, first_name, last_name, photo_200, nickname} = action.payload;
					// console.log(action.payload);
					return {
						...state,
						userID: id,
						firstName: first_name,
						secondName: last_name,
						userName: nickname,
						avatarURL: photo_200
					};
				}
			);
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
