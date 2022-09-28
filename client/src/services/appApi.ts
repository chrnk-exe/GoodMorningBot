import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const appApi = createApi({
	reducerPath: 'applicationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
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
		getVideos: build.query<IVideos[], number>({
			query: (page) => `/videos?page=${page}`
		}),
		authorize: build.query<User, string>({
			query: (token) => `/authorize?token=${token}`
		})

	}),
});

export const { 
	useGetVideosQuery,
	useAuthorizeQuery
} = appApi;
