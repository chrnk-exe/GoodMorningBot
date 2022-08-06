import { createReducer, createAction } from "@reduxjs/toolkit"

const initialState: User = {
    name: '',
    avatarURL: '',
    userID: -1,
    vkID: -1
}

const setUser = createAction<User>('setUser')

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(setUser, (state, action) => {
        const payload = action.payload
        return {
            ...state,
            ...payload
        }
    })
})