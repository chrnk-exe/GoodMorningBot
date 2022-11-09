import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/auth',
	}),
	endpoints: (build) => ({
		loginUser: build.mutation<ILoginResponse, Pick<ILoginRequest, 'login' | 'password'>>({
			query: (payload) => ({
				url: '/login',
				method: 'POST',
				body: payload,
			})
		}),
		newUser: build.mutation<ILoginResponse, Pick<ILoginRequest, 'login' | 'password'>>({
			query: (payload) => ({
				url: '/register',
				method: 'POST',
				body: payload,
			})
		}),
		getUserByVk: build.query<ILoginResponse, string>({
			query: (code) =>  `/get_access_token?code=${code}`
		})
	}),
});

export const { 
	useLoginUserMutation,
	useNewUserMutation,
	useGetUserByVkQuery,
} = userApi;
