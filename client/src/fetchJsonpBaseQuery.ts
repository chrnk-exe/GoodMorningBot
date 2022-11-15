import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import fetchJsonp from 'fetch-jsonp';

const getParams = (params?: Record<string, string | number>): string => {
	let result = '?';
	if (typeof params === 'undefined') return '';
	for (const entry of Object.entries(params)) {
		result = result + entry[0] + '=' + entry[1] + '&';
	}
	return result.slice(0, result.length - 1);
};

export default (
	{ baseUrl }: { baseUrl: string } = { baseUrl: '' },
): BaseQueryFn<
		{
			url: string;
			params?: Record<string, string | number>;
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
		params,
		timeout,
		jsonpCallback,
		jsonpCallbackFunction,
		nonce,
		referrerPolicy,
		charset,
	}) => {
		try {
			const result = await fetchJsonp(baseUrl + url + getParams(params), {
				timeout,
				jsonpCallback,
				jsonpCallbackFunction,
				nonce,
				referrerPolicy,
				charset,
			}).then(response => response.json());
			if (Array.isArray(result.response) && result.response.length == 1) {
				return { data: result.response[0] };
			}
			if (result.response) return { data: result.response };
			else if (result.error) return { error: result.error };
			else return { data: result };
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
