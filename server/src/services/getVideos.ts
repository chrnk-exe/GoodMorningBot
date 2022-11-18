import { Videos } from '../db/models/index';

export default async (page: number) => {
	const videos = await Videos.findAll({
		order: [['createdAt', 'DESC']],
		raw: true
	});
	const count = videos.length;
	const arr: number[] = [];
	for (
		let i = count - (page - 1) * 10;
		i >= count - (page - 1) * 10 - 9;
		i--
	) {
		arr.push(i);
	}
	const result = [];
	for(const numb of arr){
		result.push(videos[numb-1]);
	}
	return result.map(video => ({data: video.vkcontent, day: video.day}));
};