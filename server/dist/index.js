"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const public_1 = __importDefault(require("./routes/public"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`[server]: ${req.url}`);
    next();
});
app.use('/api', api_1.default);
app.use(public_1.default);
// static ver.
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// })
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
