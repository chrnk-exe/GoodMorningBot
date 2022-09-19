import {Videos, User, MailingUser} from './models'
import { Attributes } from 'sequelize/types';

declare interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

declare interface MailingUserAttr extends Partial<Timestamps> {
    id: number;
    vklink: string;
    customVideos: string;
}

declare interface MailingUserInput extends Optional<MailingUserAttr, 'id' | 'vklink' | 'customVideos'> { }
declare interface MailingUserOuput extends Required<MailingUserAttr> {}