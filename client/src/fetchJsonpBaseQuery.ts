import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import fetchJsonp from 'fetch-jsonp';

export default
(
	{ baseUrl }: { baseUrl: string } = { baseUrl: '' },
): BaseQueryFn<
		{
			url: string;
			timeout?: number;
			jsonpCallback?: string;
			jsonpCallbackFunction?: string;
			nonce?: string;
			referrerPolicy?: ReferrerPolicy;
			charset?: string;
		},
		unknown,
		unknown
	> =>
	async ({
		url,
		timeout,
		jsonpCallback,
		jsonpCallbackFunction,
		nonce,
		referrerPolicy,
		charset,
	}) => {
		try {
			const result = await fetchJsonp(baseUrl + url, {
				timeout,
				jsonpCallback,
				jsonpCallbackFunction,
				nonce,
				referrerPolicy,
				charset,
			}).then(response => response.json());
			return { data: result.data };
		} catch (fetchError) {
			const err = fetchError as FetchBaseQueryError;
			return {
				error: {
					status: err.status,
					data: err.data,
				},
			};
		}
	};
