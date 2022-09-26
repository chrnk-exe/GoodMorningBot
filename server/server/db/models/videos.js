"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    // class Videos extends Model {}
    const Videos = sequelize.define('videos', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        ownerid: sequelize_1.DataTypes.INTEGER,
        content: sequelize_1.DataTypes.BLOB,
        vkcontent: sequelize_1.DataTypes.STRING,
        day: sequelize_1.DataTypes.INTEGER,
    }, {
        modelName: 'videos',
        tableName: 'videos',
        timestamps: true
    });
    return Videos;
};
