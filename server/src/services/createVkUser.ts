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
		// raw: true,
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
			},
			{
				raw: true,
			},
		);
		return {
			...user,
			isAdmin: !!isAdmin,
		};
	} else {
		const data = await check.update({vk_access_token: access_token}, {raw: true});
		const user = {
			id: data.getDataValue('id'),
			email: data.getDataValue('email'),
			vklink: data.getDataValue('vklink'),
			vk_access_token: access_token,
			last_vizit: new Date(),
			added_videos: data.getDataValue('added_videos'),
		};
		return { ...user, isAdmin: !!isAdmin };
	}
};
