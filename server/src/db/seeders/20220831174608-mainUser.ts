'use strict';
import path from 'path';
import { QueryInterface } from 'sequelize/types';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import config from '../../config';

const mypath = path.resolve(process.cwd(), '.env');
dotenv.config({path: mypath});

module.exports = {
	async up (queryInterface: QueryInterface) {
		process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : '123';
		await queryInterface.bulkInsert('users', [{
			id: '184915743',
			email: 'ivan_kot2001@mail.ru',
			password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, config.saltRounds),
			vklink: 'vk.com/id184915743',
			last_vizit: new Date(),
			added_videos: '[]',
			isAdmin: true,
			activated: true,
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	async down (queryInterface: QueryInterface) {
		await queryInterface.bulkDelete('users', {});
	}
};
