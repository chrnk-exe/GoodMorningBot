import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export function isResponse<T>(response: { data: T } | {error: FetchBaseQueryError | SerializedError}) : response is { data: T } {
	return 'data' in response ? true : false;
}
