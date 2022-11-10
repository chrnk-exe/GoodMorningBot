import {Sequelize, DataTypes} from 'sequelize';
import { Admins } from '../../databaseTypes';

export default (sequelize: Sequelize) => {
	const Admins = sequelize.define<Admins>('admins', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
	}, {
		modelName: 'admins',
		tableName: 'admins',
		timestamps: true
	});
	return Admins;
};