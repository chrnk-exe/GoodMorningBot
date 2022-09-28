import { User } from '../db/models/index';
import bcrypt from 'bcrypt';

export default async (login: string, password: string) => {
	const user = await User.findOne({
		where: {
			email: login,
		},
		raw: true
	});
	if(user){
		return bcrypt.compareSync(password, user.password) ? user : null;
	}
	return user;
};
