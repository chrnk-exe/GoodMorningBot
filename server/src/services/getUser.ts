import { User } from '../db/models/index';

export default async (id: number) => {
	const user = await User.findOne({
		where: {
			id
		},
		raw: true
	});
	return user;
};