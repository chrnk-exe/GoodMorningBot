import { createApi } from '@reduxjs/toolkit/query/react';
import fetchJsonpBaseQuery from '../../fetchJsonpBaseQuery';

export const vkApi = createApi({
	reducerPath: 'vkApi',
	baseQuery: fetchJsonpBaseQuery({
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
