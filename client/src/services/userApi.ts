import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/auth',
		prepareHeaders:  (headers, { getState }) => {
			const token = (getState() as RootState).auth;
		
			// If we have a token set in state, let's assume that we should be passing it.
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			headers.set('Content-type', 'application/json; charset=UTF-8');
			return headers;
		},
	}),
	endpoints: (build) => ({
		loginUser: build.mutation<ILoginResponse, Pick<ILoginRequest, 'login' | 'password'>>({
			query: (payload) => ({
				url: '/login',
				method: 'POST',
				body: payload,
			})
		}),
		newUser: build.mutation<IRegResponse, {email: string, password: string}>({
			query: (payload) => ({
				url: '/register',
				method: 'POST',
				body: payload,
			})
		})
	}),
});

export const { 
	useLoginUserMutation,
	useNewUserMutation,
} = userApi;
