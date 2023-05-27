'use strict';
import {QueryInterface, DataTypes} from 'sequelize';

module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable('admins', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
		});
	},
	async down(queryInterface: QueryInterface) {
		await queryInterface.dropTable('admins');
	}
};