import {Sequelize, DataTypes} from 'sequelize';
import { UserModel } from '../../databaseTypes';

export default (sequelize: Sequelize) => {
	const User = sequelize.define<UserModel>('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		vklink: DataTypes.STRING,
		last_vizit: DataTypes.DATE,
		added_videos: DataTypes.TEXT,
		vk_access_token: DataTypes.STRING
	}, {
		modelName: 'users',
		tableName: 'users',
		timestamps: true
	});
	return User;
};