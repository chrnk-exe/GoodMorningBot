"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/video', (req, res) => {
    const { id } = req.query;
    res.json(id);
});
router.post('/video', (req, res) => {
    const { name } = req.body;
    res.json(name);
});
router.put('/video', (req, res) => {
    const { id } = req.body;
    res.json(id);
});
router.delete('/video', (req, res) => {
    const { id } = req.body;
    res.json(id);
});
exports.default = router;
