import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
	}),
	tagTypes: ['Post'],
	endpoints: (build) => ({
		loginUser: build.mutation<ILoginResponse, Pick<ILoginRequest, 'login' | 'password'>>({
			query: (payload) => ({
				url: '/login',
				method: 'POST',
				body: payload,
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				}
			})
		})
	}),
});

export const { useLoginUserMutation } = userApi;
