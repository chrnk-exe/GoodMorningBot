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
        primaryKey: true
    },
    vklink: STRING,
    customVideos: TEXT
}, {
    sequelize: seq,
    modelName: 'mailing_list',
    tableName: 'mailing_list'
})


Videos.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ownerid: INTEGER,
    content: BLOB,
    vkcontent: STRING,
    day: INTEGER,
    date_of_creation: DATE
}, {
    sequelize: seq,
    modelName: 'videos',
    tableName: 'videos'
})


User.init({ 
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true
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
    tableName: 'users'
})

seq.sync()