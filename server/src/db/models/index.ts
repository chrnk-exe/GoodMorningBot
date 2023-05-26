'use strict';
import { Sequelize } from 'sequelize';
import process from 'process';
import conf from '../../config/db.config';

import mailingUser from './mailinguser';
import user from './user';
import videos from './videos';
import admins from './admins';


const node_env: DBConfigIndex = process.env['NODE_ENV'] as DBConfigIndex || 'development';
const config = conf[node_env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
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
};

test();


// import sequelize from './db';

export const User = user(sequelize);
export const MailingUser = mailingUser(sequelize);
export const Videos = videos(sequelize);
export const Admins = admins(sequelize);

sequelize.sync();

export default sequelize;
