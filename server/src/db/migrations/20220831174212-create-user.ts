'use strict';
import {QueryInterface, DataTypes } from 'sequelize';

module.exports = {
	async up(queryInterface: QueryInterface ) {
		await queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true
			},
			vklink: {
				type: DataTypes.STRING,
				allowNull: true
			},
			last_vizit: {
				type: DataTypes.DATE
			},
			added_videos: {
				type: DataTypes.TEXT
			},
			isAdmin: {
				type: DataTypes.BOOLEAN
			},
			activated: {
				type: DataTypes.BOOLEAN
			},
			vk_access_token: {
				type: DataTypes.STRING,
				allowNull: true
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
		await queryInterface.dropTable('users');
	}
};