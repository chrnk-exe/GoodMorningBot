"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Videos = exports.MailingUser = exports.User = void 0;
const mailinguser_1 = __importDefault(require("./db/models/mailinguser"));
const user_1 = __importDefault(require("./db/models/user"));
const videos_1 = __importDefault(require("./db/models/videos"));
const index_1 = __importDefault(require("./db/models/index"));
// import sequelize from './db';
exports.User = (0, user_1.default)(index_1.default);
exports.MailingUser = (0, mailinguser_1.default)(index_1.default);
exports.Videos = (0, videos_1.default)(index_1.default);
