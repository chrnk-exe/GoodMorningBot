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
const LoginUser_1 = __importDefault(require("../services/LoginUser"));
const createUser_1 = __importDefault(require("../services/createUser"));
const createVkUser_1 = __importDefault(require("../services/createVkUser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const activateUser_1 = __importDefault(require("../services/activateUser"));
const isToken_1 = __importDefault(require("../typeguards/isToken"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const user = yield (0, LoginUser_1.default)(login, password);
    const token = jsonwebtoken_1.default.sign({
        Role: (user === null || user === void 0 ? void 0 : user.isAdmin) ? 2 : (user === null || user === void 0 ? void 0 : user.activated) ? 1 : 0,
        email: user === null || user === void 0 ? void 0 : user.email,
        vk: (user === null || user === void 0 ? void 0 : user.vklink) ? true : false,
        uid: user === null || user === void 0 ? void 0 : user.id,
        activated: user === null || user === void 0 ? void 0 : user.activated,
    }, config_1.default.secret, {
        expiresIn: '1d',
    });
    console.log(token);
    if (user) {
        res.json(Object.assign(Object.assign({ auth: true, info: 'Success!' }, user), { createdAt: undefined, updatedAt: undefined, token, access_token: user.vk_access_token, clientKey: config_1.default.appID }));
    }
    else {
        res.json({
            auth: false,
            info: 'Incorrect login/password',
        });
    }
}));
router.get('/confirm_email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const info = jsonwebtoken_1.default.decode(token);
    if ((0, isToken_1.default)(info)) {
        yield (0, activateUser_1.default)(info.uid);
        if (process.env.NODE_ENV === 'production') {
            res.redirect(`http://${config_1.default.host}`);
        }
        else {
            res.redirect('http://localhost:3000');
        }
    }
    else {
        res.end();
    }
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const user = yield (0, createUser_1.default)(login, password);
    const token = jsonwebtoken_1.default.sign({
        Role: (user === null || user === void 0 ? void 0 : user.isAdmin) ? 2 : (user === null || user === void 0 ? void 0 : user.activated) ? 1 : 0,
        email: user === null || user === void 0 ? void 0 : user.email,
        vk: (user === null || user === void 0 ? void 0 : user.vklink) ? true : false,
        access_token: user.vk_access_token,
        uid: user === null || user === void 0 ? void 0 : user.id,
        activated: user === null || user === void 0 ? void 0 : user.activated,
    }, config_1.default.secret, {
        expiresIn: '1d',
    });
    res.json(Object.assign(Object.assign({ auth: false, info: 'New user!' }, user), { createdAt: undefined, updatedAt: undefined, token, access_token: user === null || user === void 0 ? void 0 : user.vk_access_token }));
}));
router.get('/get_client_key', (req, res) => {
    res.json({
        clientKey: config_1.default.appID,
    });
});
router.get('/get_access_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    if (code) {
        let resp;
        try {
            resp = yield axios_1.default.get(`https://oauth.vk.com/access_token?client_id=${config_1.default.appID}&client_secret=${config_1.default.secretID}&redirect_uri=${'http://localhost:3000'}/login&code=${code}`);
        }
        catch (_a) {
            res.json({
                info: 'Code is invalid or expired'
            });
        }
        if (resp) {
            const { access_token, user_id, email } = resp.data;
            const user = yield (0, createVkUser_1.default)(access_token, user_id, email);
            if (user) {
                const token = jsonwebtoken_1.default.sign({
                    Role: (user === null || user === void 0 ? void 0 : user.isAdmin) ? 2 : (user === null || user === void 0 ? void 0 : user.activated) ? 1 : 0,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    vk: (user === null || user === void 0 ? void 0 : user.vklink) ? true : false,
                    access_token: user === null || user === void 0 ? void 0 : user.vk_access_token,
                    uid: user === null || user === void 0 ? void 0 : user.id,
                    activated: user === null || user === void 0 ? void 0 : user.activated,
                }, config_1.default.secret, {
                    expiresIn: '1d',
                });
                res.json(Object.assign(Object.assign({ auth: true, info: 'Success!' }, user), { createdAt: undefined, updatedAt: undefined, token, access_token: user.vk_access_token, clientKey: config_1.default.appID }));
            }
        }
    }
    else {
        res.json({
            auth: false,
            info: 'No code'
        });
    }
}));
router.get('/login_vk', (req, res) => {
    console.log(req.url);
    res.json({ 'aaa': 'bbb' });
});
exports.default = router;
