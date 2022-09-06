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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
// import { MailingUser, User, Videos } from './model';
const mailinguser_1 = __importDefault(require("./db/models/mailinguser"));
const user_1 = __importDefault(require("./db/models/user"));
const videos_1 = __importDefault(require("./db/models/videos"));
const User = (0, user_1.default)(db_1.default);
const MailingUser = (0, mailinguser_1.default)(db_1.default);
const Videos = (0, videos_1.default)(db_1.default);
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { login, password } = data;
    const user = yield User.findAll({
        where: {
            email: login,
            password: password
        }
    });
    if (user.length === 1) {
        const info = user[0];
        res.json({
            auth: true,
            id: info.getDataValue('id'),
            vklink: info.getDataValue('vklink'),
            last_vizit: info.getDataValue('last_vizit'),
            added_videos: JSON.parse(info.getDataValue('added_videos')),
            isAdmin: info.getDataValue('isAdmin'),
            activated: info.getDataValue('activated')
        });
    }
    else if (user.length > 1) {
        console.warn(`Duplicate user with ${login} email`);
        res.json({ auth: false, code: loginErrors.DUPLICATE_USER });
    }
    else {
        const users = yield User.findAll({
            where: {
                email: login
            }
        });
        res.json({
            auth: false,
            code: users.length != 0
                ? loginErrors.INCORRECT_PASSWORD
                : loginErrors.USER_DOESNT_EXIST
        });
    }
}));
router.post('/register', (req, res) => {
    res.json({ 'register': 'world!' });
});
exports.default = router;
