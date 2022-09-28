import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../services/userApi';
import { appApi } from '../services/appApi';

const initialState: User = {
	vkID: -1,
	name: null,
	Role: 0,
	avatarURL: null,
	userID: -1
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			return action.payload;
		}
	}, 
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, action) => {
				console.log('consolelog from userreducer');
				const {id, email, isAdmin, activated } = action.payload;
				return {
					vkID: id,
					name: email,
					Role: isAdmin ? 2 : activated ? 1 : 0,
					avatarURL: null,
					userID: id
				};
			})
			.addMatcher(appApi.endpoints.authorize.matchFulfilled, (state, action: PayloadAction<ILoginResponse>) => {
				console.log('consolelog from userreducer');
				console.log(action.payload);
				const {id, email, isAdmin, activated } = action.payload;
				return {
					vkID: id,
					name: email,
					Role: isAdmin ? 2 : activated ? 1 : 0,
					avatarURL: null,
					userID: id
				};
			});
	}
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;