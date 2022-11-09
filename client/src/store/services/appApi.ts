import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const appApi = createApi({
	reducerPath: 'applicationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		prepareHeaders:  (headers, { getState }) => {
			const token = (getState() as RootState).auth;
		
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			headers.set('Content-type', 'application/json; charset=UTF-8');
			return headers;
		},
	}),
	endpoints: (build) => ({
		getAllVideos: build.query<IVideos[], number>({
			query: (page) => `/videos?page=${page}`
		}),
		authorize: build.query<ILoginResponse, string>({
			query: (token) => `/authorize?token=${token}`
		}),
		getUserVideos: build.query<IVideos[], number>({
			query: (page) => `/user_videos?page=${page}`
		}),
		confirmMail: build.mutation<void, {token: string}>({
			query: (payload) => ({
				url: '/confirm_email',
				method: 'POST',
				body: payload
			})
		})

	}),
});

export const { 
	useGetAllVideosQuery,
	useAuthorizeQuery,
	useGetUserVideosQuery,
	useConfirmMailMutation
} = appApi;
