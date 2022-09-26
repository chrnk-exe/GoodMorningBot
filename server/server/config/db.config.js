'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const mypath = path_1.default.resolve(__dirname, '../../.env');
dotenv_1.default.config({ path: mypath });
// console.log(process.env.DB_PORT, mypath)
exports.default = {
    development: {
        database: process_1.env.DB_DATABASE,
        username: process_1.env.DB_USERNAME,
        password: process_1.env.DB_PASSWORD,
        host: process_1.env.DB_HOST,
        port: process_1.env.DB_PORT,
        dialect: 'postgres',
        use_env_variable: true,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        // dialectOptions: {
        //   useUTC: false,
        //   timezone: 'Etc/GMT+3',
        // },
        logging: false, // console.log,
    },
    production: {
        database: process_1.env.DB_DATABASE,
        username: process_1.env.DB_USERNAME,
        password: process_1.env.DB_PASSWORD,
        host: process_1.env.DB_HOST,
        port: process_1.env.DB_PORT,
        dialect: 'postgres',
        use_env_variable: true,
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        // dialectOptions: {
        //   useUTC: false,
        //   timezone: 'Etc/GMT+3',
        // },
        logging: false,
    },
    test: {
        database: process_1.env.DB_DATABASE,
        username: process_1.env.DB_USERNAME,
        password: process_1.env.DB_PASSWORD,
        host: process_1.env.DB_HOST,
        port: process_1.env.DB_PORT,
        use_env_variable: true,
        dialect: 'postgres',
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        // dialectOptions: {
        //   useUTC: false,
        //   timezone: 'Etc/GMT+3',
        // },
        logging: false,
    },
};
