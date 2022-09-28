import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: User = {
	vkID: -1,
	name: null,
	Role: 'user',
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
	}
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;