import { Sequelize } from "sequelize";

const seq = new Sequelize('postgres://postgres:qwerty@localhost:5432/BotDB', {
	logging: false
})

const test = async () => {
	try {
		await seq.authenticate();
		console.log('Connection has been established successfully.');
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

test()

export default seq;