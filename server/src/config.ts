import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, '../.env')});


const config = {
	saltRounds: 10,
	secret: process.env.SECRET_JWT || 'dhtawfvdulakwdgtawydnwbadyu',
	mailpassword: process.env.MAIL_PASSWORD,
	mailGooglePassword: process.env.MAIL_GOOGLE_PASSWORD,
	host: process.env.DOMAIN,
	appID: process.env.VK_APP_ID,
	secretID: process.env.SECRET_VK_APP_ID
};

export default config;