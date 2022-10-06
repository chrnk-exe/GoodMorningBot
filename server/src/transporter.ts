import nodemailer from 'nodemailer';
import config from './config';

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: 'goodmorningbot.app@gmail.com', 
		pass: config.mailGooglePassword, 
	},
}, {
	from: 'goodmorningbot.app@gmail.com'
});

export const mailer = async (message: string, email: string) => {
	await transporter.sendMail({
		from: 'goodmorningbot.app@gmail.com',
		to: email,
		subject: 'Bot app account confirming',
		text: message
	});
};