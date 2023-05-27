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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../db/models/index");
// import bcrypt from 'bcrypt';
// import config from '../config';
exports.default = (access_token, id, email) => __awaiter(void 0, void 0, void 0, function* () {
    // const hashedToken = bcrypt.hashSync(access_token, config.saltRounds);
    const isAdmin = yield index_1.Admins.findOne({
        where: {
            id,
        },
        raw: true,
    });
    const check = yield index_1.User.findOne({
        where: {
            id,
        },
        // raw: true,
    });
    if (!check) {
        const user = yield index_1.User.create({
            id,
            email,
            vklink: `vk.com/id${id}`,
            vk_access_token: access_token,
            last_vizit: new Date(),
            added_videos: '[]',
        }, {
            raw: true,
        });
        return Object.assign(Object.assign({}, user), { isAdmin: !!isAdmin });
    }
    else {
        const data = yield check.update({ vk_access_token: access_token }, { raw: true });
        const user = {
            id: data.getDataValue('id'),
            email: data.getDataValue('email'),
            vklink: data.getDataValue('vklink'),
            vk_access_token: access_token,
            last_vizit: new Date(),
            added_videos: data.getDataValue('added_videos'),
        };
        return Object.assign(Object.assign({}, user), { isAdmin: !!isAdmin });
    }
});
