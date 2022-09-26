'use strict';
import path from "path";
import dotenv from 'dotenv'
import { env } from "process";

const mypath = path.resolve(__dirname, '../../.env')
dotenv.config({path: mypath})

// console.log(process.env.DB_PORT, mypath)

export default {
  development: {
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
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
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
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
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
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
} as DBConfig