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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER
                },
                email: {
                    type: sequelize_1.DataTypes.STRING
                },
                password: {
                    type: sequelize_1.DataTypes.STRING
                },
                vklink: {
                    type: sequelize_1.DataTypes.STRING
                },
                last_vizit: {
                    type: sequelize_1.DataTypes.DATE
                },
                added_videos: {
                    type: sequelize_1.DataTypes.TEXT
                },
                isAdmin: {
                    type: sequelize_1.DataTypes.BOOLEAN
                },
                activated: {
                    type: sequelize_1.DataTypes.BOOLEAN
                },
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: sequelize_1.DataTypes.NOW
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: sequelize_1.DataTypes.NOW
                }
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('users');
        });
    }
};
