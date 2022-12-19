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
const getUser_1 = __importDefault(require("../services/getUser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isToken_1 = __importDefault(require("../typeguards/isToken"));
const config_1 = __importDefault(require("../config"));
const transporter_1 = require("../transporter");
const getVideos_1 = __importDefault(require("../services/getVideos"));
const router = express_1.default.Router();
router.get('/authorize', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const info = jsonwebtoken_1.default.decode(token);
    if ((0, isToken_1.default)(info)) {
        const user = yield (0, getUser_1.default)(info.uid);
        res.json(Object.assign(Object.assign({ auth: true, info: 'Success!' }, user), { clientKey: config_1.default.appID, access_token: info.access_token, vk_access_token: undefined, password: undefined, createdAt: undefined, updatedAt: undefined }));
    }
    else {
        res.json({
            auth: false,
            info: 'token expired'
        });
    }
}));
router.post('/confirm_email', (req, res) => {
    const { token } = req.body;
    const info = jsonwebtoken_1.default.decode(token);
    if ((0, isToken_1.default)(info)) {
        //generate token
        const { uid, Role, email, vk } = info;
        const generated_token = jsonwebtoken_1.default.sign({
            uid,
            activated: true,
            Role: Role + 1,
            email,
            vk
        }, config_1.default.secret, {
            expiresIn: '1h'
        });
        //send message
        (0, transporter_1.mailer)(`Click this link to confirm your account: http://${config_1.default.host}/auth/confirm_email?token=${generated_token}`, email);
    }
    res.json('Account activated!');
});
router.get('/all_videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const vkcontentArray = yield (0, getVideos_1.default)(+page);
    res.json({ response: vkcontentArray });
}));
router.get('/user_videos', (req, res) => {
    res.send('User videos!');
});
exports.default = router;
