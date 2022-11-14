import { User, Admins } from '../db/models/index';

export default async (id: number) => {
	const isAdmin = await Admins.findOne({
		where: {
			id,
		},
		raw: true,
	});
	const user = await User.findOne({
		where: {
			id,
		},
		raw: true,
	});
	return { ...user, isAdmin: isAdmin ? true : false };
};
