'use strict';
import path from 'path';
import { QueryInterface } from 'sequelize/types';
import dotenv from 'dotenv';
const mypath = path.resolve(process.cwd(), '.env');
dotenv.config({path: mypath});

module.exports = {
	async up (queryInterface: QueryInterface) {
		await queryInterface.bulkInsert('users', [{
			id: '184915743',
			email: 'ivan_kot2001@mail.ru',
			password: process.env.ADMIN_PASSWORD,
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
