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
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const mypath = path_1.default.resolve(process.cwd(), '.env');
dotenv_1.default.config({ path: mypath });
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD : '123';
            yield queryInterface.bulkInsert('users', [{
                    id: '1849157431',
                    email: 'ivan_kot2001@mail.ru',
                    password: bcrypt_1.default.hashSync(process.env.ADMIN_PASSWORD, config_1.default.saltRounds),
                    vklink: '',
                    last_vizit: new Date(),
                    added_videos: '[]',
                    isAdmin: true,
                    activated: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('users', {});
        });
    }
};
