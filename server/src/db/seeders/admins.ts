'use strict';
import { QueryInterface } from 'sequelize/types';

module.exports = {
	async up (queryInterface: QueryInterface) {
		await queryInterface.bulkInsert('admins', [{
			id: '184915743',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	async down (queryInterface: QueryInterface) {
		await queryInterface.bulkDelete('admins', {});
	}
};
