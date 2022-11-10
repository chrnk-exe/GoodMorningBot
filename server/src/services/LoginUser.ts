import { User, Admins } from '../db/models/index';
import bcrypt from 'bcrypt';

export default async (login: string, password: string) => {
	const user = await User.findOne({
		where: {
			email: login,
		},
		raw: true
	});
	if(user){
		const isAdmin = await Admins.findOne({
			where: {
				id: user.id
			}
		});
		const returning_user = {
			...user,
			isAdmin: isAdmin ? true : false
		};
		if(user && user.password){
			return bcrypt.compareSync(password, user.password) ? returning_user : null;
		}
		return null;
	}
	return null;
};
