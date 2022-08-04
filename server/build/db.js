"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    password: '1234',
    database: 'test',
    host: 'localhost',
    port: 5432
});
// module.exports = pool
exports.default = pool;
//# sourceMappingURL=db.js.map