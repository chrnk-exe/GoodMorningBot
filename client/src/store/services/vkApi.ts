import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vkApi = createApi({
	reducerPath: 'vkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '',
	}),
	endpoints: build => ({
		getClientKey: build.query<{clientKey: string}, void>({
			query: () => 'http://localhost:5000/auth/get_client_key',
		})
	}),
});

export const { useGetClientKeyQuery } = vkApi;
