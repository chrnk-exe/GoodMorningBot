"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const Admins = sequelize.define('admins', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        modelName: 'admins',
        tableName: 'admins',
        timestamps: true
    });
    return Admins;
};
