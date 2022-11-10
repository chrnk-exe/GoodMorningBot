"use strict";
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
const index_1 = require("../db/models/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
const minId = 1111111111;
const maxId = 2000000000;
exports.default = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcrypt_1.default.hashSync(password, config_1.default.saltRounds);
    const user = yield index_1.User.create({
        id: getRandomInt(minId, maxId),
        email,
        password: hashedPassword,
        vklink: '',
        last_vizit: new Date(),
        added_videos: '[]',
        activated: false,
    }, {
        raw: true,
    });
    return Object.assign(Object.assign({}, user), { isAdmin: false });
});
