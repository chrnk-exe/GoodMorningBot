'use strict';
import path from 'path';
import { QueryInterface } from 'sequelize/types';
import dotenv from 'dotenv';
const mypath = path.resolve(process.cwd(), '.env');
dotenv.config({path: mypath});


module.exports = {
	async up (queryInterface: QueryInterface) {
		const arr = [];
		for(let i = 456239942; i <= 456239953; i++){
			arr.push({
				ownerid: 184915743,
				content: null,
				vkcontent: `184915743_${i}`,
				day: 0,
				createdAt: new Date(),
				updatedAt: new Date()
			});
		}
		await queryInterface.bulkInsert('videos', arr, {});
	},

	async down (queryInterface: QueryInterface) {
		await queryInterface.bulkDelete('users', {});
	}
};
