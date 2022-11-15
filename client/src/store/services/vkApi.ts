import { createApi } from '@reduxjs/toolkit/query/react';
import fetchJsonpBaseQuery from '../../fetchJsonpBaseQuery';

const createAuthor = (
	ownerID: number,
	profiles?: GetVideoResponse.Profile[],
	groups?: GetVideoResponse.Group[],
): GetVideoResponse.ProfileAuthor | GetVideoResponse.GroupAuthor => {
	// что то одно из profiles или groups есть точно
	if(typeof profiles === 'undefined'){
		return {
			name: (groups as GetVideoResponse.Group[])[0].name,
			photo_200: (groups as GetVideoResponse.Group[])[0].photo_200,
			url: `vk.com/id${ownerID}`,
		};
	}
	if(typeof groups === 'undefined'){
		return {
			firstName: (profiles as GetVideoResponse.Profile[])[0].first_name,
			secondName: (profiles as GetVideoResponse.Profile[])[0].last_name,
			url: `vk.com/id${ownerID}`,
		};
	}
	profiles.filter(profile => profile.id === ownerID);
	groups.filter(group => group.id === ownerID);
	if(profiles && groups && profiles.length >  groups.length){
		return {
			firstName: profiles[0].first_name,
			secondName: profiles[0].last_name,
			url: `vk.com/id${ownerID}`,
		};
	} else {
		return {
			name: (groups as GetVideoResponse.Group[])[0].name,
			photo_200: (groups as GetVideoResponse.Group[])[0].photo_200,
			url: `vk.com/id${ownerID}`,
		};
	}
};

export const vkApi = createApi({
	reducerPath: 'vkApi',
	baseQuery: fetchJsonpBaseQuery({
		baseUrl: 'https://api.vk.com/method/',
	}),
	endpoints: build => ({
		getUser: build.query<GetUserResponse, Record<string, string | number>>({
			query: params => ({ url: 'users.get', params }),
		}),
		getVideo: build.query<
			GetVideoResponse.AppResponse[],
			Record<string, string | number>
		>({
			query: params => ({ url: 'video.get', params }),
			transformResponse: (response: GetVideoResponse.Response) => {
				const { items, profiles, groups } = response;
				const result = items.map(item => ({
					duration: item.duration,
					image: item.image[item.image.length - 1].url,
					first_frame:
						item.first_frame[item.first_frame.length - 1].url,
					video: item.player,
					views: item.views,
					likes: item.likes.count,
					reposts: item.reposts.count,
					author: createAuthor(item.owner_id, profiles, groups),
					id: item.id,
				}));
				return result;
				// if (isGetVideoResponse(response)) {
				// 	if (response.items[0].privacy_view.category !== 'all') {
				// 		return {
				// 			error_code: -1,
				// 			error_msg: 'Video unavailable',
				// 		};
				// 	}
				// 	const result: GetVideoResponse.AppResponse = {
				// 		duration: response.items[0].duration,
				// 		image: response.items[0].image[
				// 			response.items[0].image.length - 1
				// 		].url,
				// 		first_frane:
				// 			response.items[0].first_frame[
				// 				response.items[0].first_frame.length - 1
				// 			].url,
				// 		video: response.items[0].player,
				// 		views: response.items[0].views,
				// 		likes: response.items[0].likes.count,
				// 		reposts: response.items[0].reposts.count,
				// 	};
				// 	if (withProfile(response)) {
				// 		result.author = {
				// 			firstName: response.profiles[0].first_name,
				// 			secondName: response.profiles[0].last_name,
				// 			url: `vk.com/id${response.profiles[0].id}`,
				// 		} as GetVideoResponse.ProfileAuthor;
				// 	} else if (withGroup(response)) {
				// 		result.author = {
				// 			name: response.groups[0].name,
				// 			photo_200: response.groups[0].photo_200,
				// 			url: `vk.com/id${response.groups[0].id}`,
				// 		};
				// 	}
				// 	return result;
				// } else {
				// 	if(response) return response;
				// 	else return {
				// 		error_code: -1,
				// 		error_msg: 'Response is undefined'
				// 	};
				// }
			},
		}),
	}),
});

export const { useGetUserQuery, useGetVideoQuery } = vkApi;

// export const { useGetClientKeyQuery } = vkApi;
