import { useGetVideoQuery } from '../../store/services/vkApi';
import { type RootState, store } from '../../store/store';

export default
(
	content: string,
	skip?: boolean,
) => {
	const access_token =
            (store.getState() as RootState).auth.access_token || '';
    
	return useGetVideoQuery(
		{
			access_token,
			count: 1,
			fields: 'privacy_view',
			extended: 1,
			videos: content,
			// ...params,
			v: '5.131',
		},
		{ skip: skip || !access_token },
	);
};