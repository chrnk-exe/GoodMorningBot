'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const process_1 = __importDefault(require("process"));
const db_config_1 = __importDefault(require("../../config/db.config"));
const node_env = process_1.default.env['NODE_ENV'] || 'development';
const config = db_config_1.default[node_env];
let sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: +config.port,
    dialect: 'postgres',
    logging: config.logging
});
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('[DB]: Connection has been established successfully.');
    }
    catch (error) {
        console.error('[DB]: Unable to connect to the database:', error);
    }
});
test();
exports.default = sequelize;
