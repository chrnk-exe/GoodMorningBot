"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const MailingUser = sequelize.define('mailing_list', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        vklink: sequelize_1.DataTypes.STRING,
        customVideos: sequelize_1.DataTypes.TEXT,
    }, {
        modelName: "mailing_list",
        tableName: "mailing_list",
        timestamps: true,
    });
    return MailingUser;
};
