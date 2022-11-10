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
exports.default = (login, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.User.findOne({
        where: {
            email: login,
        },
        raw: true
    });
    if (user) {
        const isAdmin = yield index_1.Admins.findOne({
            where: {
                id: user.id
            }
        });
        const returning_user = Object.assign(Object.assign({}, user), { isAdmin: isAdmin ? true : false });
        if (user && user.password) {
            return bcrypt_1.default.compareSync(password, user.password) ? returning_user : null;
        }
        return null;
    }
    return null;
});
