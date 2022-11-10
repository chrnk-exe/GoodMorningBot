"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: sequelize_1.DataTypes.STRING,
        password: sequelize_1.DataTypes.STRING,
        vklink: sequelize_1.DataTypes.STRING,
        last_vizit: sequelize_1.DataTypes.DATE,
        added_videos: sequelize_1.DataTypes.TEXT,
        vk_access_token: sequelize_1.DataTypes.STRING,
        activated: sequelize_1.DataTypes.BOOLEAN,
    }, {
        modelName: 'users',
        tableName: 'users',
        timestamps: true
    });
    return User;
};
