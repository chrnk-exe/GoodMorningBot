"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/save_video', (req, res) => {
    console.log('save video');
    res.json({ 'video': 'saved' });
});
app.get('/save_video', (req, res) => {
    console.log('save video');
    res.json({ 'video': 'saved' });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=index.js.map