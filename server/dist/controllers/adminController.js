"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isToken_1 = __importDefault(require("../typeguards/isToken"));
exports.default = (req, res, next) => {
    const token = req.auth;
    if ((0, isToken_1.default)(token)) {
        if (token.Role !== 2)
            res.status(403);
        else
            next();
    }
    else {
        res.status(401);
    }
};
