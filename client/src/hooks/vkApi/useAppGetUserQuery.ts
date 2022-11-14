import { useGetUserQuery } from '../../store/services/vkApi';
import { type RootState, store } from '../../store/store';

export default (
	params: { user_ids: number; fields: string; name_case: string },
	skip: boolean,
) => {
	const access_token =
		(store.getState() as RootState).auth.access_token || '';

	return useGetUserQuery(
		{
			access_token,
			...params,
			v: '5.131',
		},
		{ skip: skip || !access_token },
	);
};
