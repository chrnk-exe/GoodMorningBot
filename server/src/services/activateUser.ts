import { User } from '../db/models/index';

export default async (id: number) => {
	const user = await User.findOne({
		where: {
			id
		}
	});
	if(user){
		user.activated = true;
		user.save();
		return true;
	}
	return false;
};