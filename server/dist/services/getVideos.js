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
exports.default = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield index_1.Videos.findAll({
        order: [['createdAt', 'DESC']],
        raw: true
    });
    const count = videos.length;
    const arr = [];
    for (let i = count - (page - 1) * 10; i >= count - (page - 1) * 10 - 9; i--) {
        arr.push(i);
    }
    const result = [];
    for (const numb of arr) {
        result.push(videos[numb - 1]);
    }
    return result;
});
