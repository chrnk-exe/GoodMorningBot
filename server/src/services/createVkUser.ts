import { User } from '../db/models/index';
// import bcrypt from 'bcrypt';
// import config from '../config';

export default async (access_token: string, id: number, email?: string) => {
    
	// const hashedToken = bcrypt.hashSync(access_token, config.saltRounds);

	const check = await User.findOne({
		where: {
			id
		},
		raw: true
	});

	if(!check){
		const user = await User.create({
			id,
			email,
			vklink: `vk.com/id${id}`,
			vk_access_token: access_token,
			last_vizit: new Date(),
			added_videos: '[]',
			isAdmin: false,
			activated: true,
		}, {
			raw: true
		});
		return user;
	}
	return null;
};