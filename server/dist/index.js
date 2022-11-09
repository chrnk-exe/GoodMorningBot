"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const express_jwt_1 = require("express-jwt");
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`[server]: ${req.url}`);
    next();
});
app.use('/auth', auth_1.default);
app.use((0, express_jwt_1.expressjwt)({
    secret: config_1.default.secret,
    algorithms: ['HS256'],
    getToken: (req) => {
        if (req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        else if (req.query.token) {
            return req.query.token;
        }
        return undefined;
    }
}));
app.use('/api', api_1.default);
// static ver.
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// })
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
