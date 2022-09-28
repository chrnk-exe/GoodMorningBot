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
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const user = yield (0, LoginUser_1.default)(login, password);
    if (user) {
        res.json(Object.assign(Object.assign({ auth: true, info: 'Success!' }, user), { createdAt: undefined, updatedAt: undefined, token: undefined }));
    }
    else {
        res.json({
            auth: false,
            info: 'Incorrect login/password'
        });
    }
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, createUser_1.default)(email, password);
    res.json(Object.assign(Object.assign({ auth: false, info: 'New user!' }, user), { createdAt: undefined, updatedAt: undefined }));
}));
// router.get('/user', async (req : TypedRequestQuery<{id: string}>, res: Response) => {
//     const { id } = req.query
// })
exports.default = router;
