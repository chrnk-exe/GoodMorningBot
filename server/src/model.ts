import { Model, DataTypes } from "sequelize";
import seq from './db'

const {STRING, INTEGER, TEXT, BLOB, DATE, BOOLEAN} = DataTypes

export class MailingUser extends Model { }
export class Videos extends Model { }
export class User extends Model { }

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
    sequelize: seq,
    modelName: 'mailing_list',
    tableName: 'mailing_list',
    timestamps: true
})


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
    sequelize: seq,
    modelName: 'videos',
    tableName: 'videos',
    timestamps: true
})


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
    sequelize: seq,
    modelName: 'users',
    tableName: 'users',
    timestamps: true
})

seq.sync()