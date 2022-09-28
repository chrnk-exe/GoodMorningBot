import { User } from '../db/models/index';
import bcrypt from 'bcrypt';
import config from '../config';

function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); 
}

const minId = 1111111111;
const maxId = 2000000000;

export default async (email: string, password: string) => {
    
	const hashedPassword = bcrypt.hashSync(password, config.saltRounds);

	const user = await User.create({
		id: getRandomInt(minId, maxId),
		email,
		password: hashedPassword,
		vklink: '',
		last_vizit: new Date(),
		added_videos: '[]',
		isAdmin: false,
		activated: false,
	}, {
		raw: true
	});
	return user;
};