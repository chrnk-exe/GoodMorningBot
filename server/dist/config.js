"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const config = {
    saltRounds: 10,
    secret: process.env.SECRET_JWT || 'dhtawfvdulakwdgtawydnwbadyu',
    mailpassword: process.env.MAIL_PASSWORD,
    mailGooglePassword: process.env.MAIL_GOOGLE_PASSWORD,
    host: process.env.DOMAIN,
    appID: process.env.VK_APP_ID,
    secretID: process.env.SECRET_VK_APP_ID
};
exports.default = config;
