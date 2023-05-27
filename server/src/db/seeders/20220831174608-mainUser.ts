'use strict';
import path from 'path';
import { QueryInterface } from 'sequelize/types';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import config from '../../config';

const myPath = path.resolve(process.cwd(), '.env');
dotenv.config({path: myPath});

module.exports = {
	async up (queryInterface: QueryInterface) {
		process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : '123';
		await queryInterface.bulkInsert('users', [{
			id: '1849157431',
			email: 'ivan_kot2001@mail.ru',
			password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, config.saltRounds),
			vklink: '',
			last_vizit: new Date(),
			added_videos: '[]',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	async down (queryInterface: QueryInterface) {
		await queryInterface.bulkDelete('users', {});
	}
};
