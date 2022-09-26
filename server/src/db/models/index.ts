'use strict';
import { Sequelize } from 'sequelize';
import process from 'process';
import conf from '../../config/db.config'

const node_env: DBConfigIndex = process.env['NODE_ENV'] as DBConfigIndex || 'development';
const config = conf[node_env];

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: +config.port,
    dialect: 'postgres',
    logging: config.logging
});

const test = async () => {
	try {
		await sequelize.authenticate();
		console.log('[DB]: Connection has been established successfully.');
	  } catch (error) {
		console.error('[DB]: Unable to connect to the database:', error);
	}
}

test()

export default sequelize
