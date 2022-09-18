import mailingUser from '../db/models/mailinguser'
import user from '../db/models/user';
import videos from '../db/models/videos';
import sequelize from '../db';

export const User = user(sequelize)
export const MailingUser = mailingUser(sequelize)
export const Videos = videos(sequelize)

