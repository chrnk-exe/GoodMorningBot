"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Videos = exports.MailingUser = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
const { STRING, INTEGER, TEXT, BLOB, DATE, BOOLEAN } = sequelize_1.DataTypes;
class MailingUser extends sequelize_1.Model {
}
exports.MailingUser = MailingUser;
class Videos extends sequelize_1.Model {
}
exports.Videos = Videos;
class User extends sequelize_1.Model {
}
exports.User = User;
MailingUser.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    vklink: STRING,
    customVideos: TEXT
}, {
    sequelize: db_1.default,
    modelName: 'mailing_list',
    tableName: 'mailing_list',
    timestamps: true
});
Videos.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ownerid: INTEGER,
    content: BLOB,
    vkcontent: STRING,
    day: INTEGER,
    date_of_creation: DATE
}, {
    sequelize: db_1.default,
    modelName: 'videos',
    tableName: 'videos',
    timestamps: true
});
User.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: STRING,
    password: STRING,
    vklink: STRING,
    last_vizit: DATE,
    added_videos: TEXT,
    isAdmin: BOOLEAN,
    activated: BOOLEAN
}, {
    sequelize: db_1.default,
    modelName: 'users',
    tableName: 'users',
    timestamps: true
});
db_1.default.sync();
//# sourceMappingURL=model.js.map