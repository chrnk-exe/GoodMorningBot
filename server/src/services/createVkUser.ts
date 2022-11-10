import { User, Admins } from '../db/models/index';
// import bcrypt from 'bcrypt';
// import config from '../config';

export default async (access_token: string, id: number, email?: string) => {
	// const hashedToken = bcrypt.hashSync(access_token, config.saltRounds);

	const isAdmin = await Admins.findOne({
		where: {
			id,
		},
		raw: true,
	});

	const check = await User.findOne({
		where: {
			id,
		},
		raw: true,
	});

	if (!check) {
		const user = await User.create(
			{
				id,
				email,
				vklink: `vk.com/id${id}`,
				vk_access_token: access_token,
				last_vizit: new Date(),
				added_videos: '[]',
				activated: true,
			},
			{
				raw: true,
			},
		);
		return {
			...user,
			isAdmin: isAdmin ? true : false,
		};
	}
	return { ...check, isAdmin: isAdmin ? true : false };
};
