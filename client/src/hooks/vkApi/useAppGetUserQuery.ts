import { useGetUserQuery } from '../../store/services/vkApi';
import { type RootState, store } from '../../store/store';
import fetchJsonp from 'fetch-jsonp';

export default async (
	skip: boolean,
	params: { user_ids: number; fields: string; name_case: string },
) => {
	const data = await fetchJsonp('https://api.vk.com/method/users.get?access_token=vk1.a.zaw3KA9O704ZRPPLfz7vqYpFKbKr4KGsclk8TLDqnVPdVKqwZ4N9koJm_wgUqcFPTdMLGfAMlj4-K3hs-o7vl5wo_tzi2m_z658ef8gRx-g8PCvUkNHCUO5YDJMJ2snBym7RBWsyoaWGROti_-kFeXVH2akWx9LduLZXNh56BNGHCO40HJJ0IcjFZjNhiSvwKNDOZ3qffoWWNyFqS-rBow&user_ids=184915743&fields=first_name,photo_50&v=5.131').then(res => res.json());
	console.log(data);
	// const access_token =
	// 	(store.getState() as RootState).auth.access_token || '';
	// const script = document.createElement('script') as HTMLScriptElement;
	// script.src =
	// 	'https://api.vk.com/method/users.get?user_ids=210700286&fields=bdate&v=5.131&callback=callbackFunc';
	// document.getElementsByTagName('head')[0].appendChild(script);
	// function callbackFunc(result: { response: Array<any> }) {
	// 	alert(result.response[0].first_name);
	// }
	// if (access_token) {
	// 	return useGetUserQuery(
	// 		{
	// 			access_token,
	// 			...params,
	// 			v: '5.131',
	// 			redirect_uri: 'http://localhost:3000/login',
	// 		},
	// 		{ skip },
	// 	);
	// }
};
