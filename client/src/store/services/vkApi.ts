import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vkApi = createApi({
	reducerPath: 'vkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.vk.com/method/',
	}),
	endpoints: build => ({
		getUser: build.query<unknown, void>({
			query: () => 'users.get',
		})
	}),
});

// export const { useGetClientKeyQuery } = vkApi;
