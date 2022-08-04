import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
	password: '1234',
	database: 'test',
	host: 'localhost',
	port: 5432
})

// module.exports = pool
export default pool;