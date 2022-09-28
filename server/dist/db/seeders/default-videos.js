'use strict';
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
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const mypath = path_1.default.resolve(process.cwd(), '.env');
dotenv_1.default.config({ path: mypath });
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            const arr = [];
            for (let i = 456239942; i <= 456239953; i++) {
                arr.push({
                    ownerid: 184915743,
                    content: null,
                    vkcontent: `184915743_${i}`,
                    day: 0,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
            yield queryInterface.bulkInsert('videos', arr, {});
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete('users', {});
        });
    }
};
