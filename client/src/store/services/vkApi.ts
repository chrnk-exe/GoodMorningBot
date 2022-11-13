import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vkApi = createApi({
	reducerPath: 'vkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.vk.com/method/',
	}),
	endpoints: build => ({
		getUser: build.query<Record<string, string>, Record<string, string | number>>({
			query: params => ({ url: 'users.get', params }),
		}),
	}),
});

export const { useGetUserQuery } = vkApi;

// export const { useGetClientKeyQuery } = vkApi;
