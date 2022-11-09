import { User } from '../db/models/index';
import bcrypt from 'bcrypt';
import config from '../config';

export default async (access_token: string, id: number, email?: string) => {
	const hashedToken = bcrypt.hashSync(access_token, config.saltRounds);
    
	if(email){
		const user = await User.findOne({
			where: {
				email
			}
		});
	}
	return;
};

