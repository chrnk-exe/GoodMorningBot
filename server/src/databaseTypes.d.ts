import {InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: number;
    email: string;
    password: string;
    vklink: string;
    last_vizit: Date;
    added_videos: string;
    isAdmin: boolean;
    activated: boolean;
}

export interface MailingUserModel extends Model<InferAttributes<MailingUserModel>, InferCreationAttributes<MailingUserModel>> {
    id: number;
    vklink: string;
    customVideos: string;
}

export interface VideoModel extends Model<InferAttributes<VideoModel>, InferCreationAttributes<VideoModel>> {
    id: number;
    ownerid: number;
    content: BinaryType;
    vkcontent: string;
    day: dayOfTheWeek;
}

