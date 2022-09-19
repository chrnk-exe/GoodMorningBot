import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/BotDB', {
	logging: false
})

const test = async () => {
	try {
		await sequelize.authenticate();
		console.log('[DB]: Connection has been established successfully.');
	  } catch (error) {
		console.error('[DB]: Unable to connect to the database:', error);
	}
}

test()

export default sequelize;