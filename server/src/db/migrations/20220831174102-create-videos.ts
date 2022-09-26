import {QueryInterface, DataTypes } from 'sequelize';

module.exports = {
	async up(queryInterface: QueryInterface) {
		await queryInterface.createTable('videos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			ownerid: {
				type: DataTypes.INTEGER
			},
			content: {
				type: DataTypes.BLOB
			},
			vkcontent: {
				type: DataTypes.STRING
			},
			day: {
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
		await queryInterface.dropTable('videos');
	}
};