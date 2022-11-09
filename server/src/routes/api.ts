import express, { Response, Router } from 'express';
// import { Request as JWTRequest } from 'express-jwt';
import { TypedRequestBody, TypedRequestQuery } from '../expressTypes';
import getUser from '../services/getUser';
import jwt from 'jsonwebtoken';
import isToken from '../typeguards/isToken';
import config from '../config';
import { mailer } from '../transporter';
import getVideos from '../services/getVideos';

const router: Router = express.Router();

router.get('/authorize', async (req: TypedRequestQuery<{token: string}>, res: Response) => {
	const { token } = req.query;
	const info = jwt.decode(token);
	if(isToken(info)){
		const user = await getUser(info.uid);
		res.json({
			auth: true,
			info: 'Success!',
			...user,
			clientKey: config.appID,
			password: undefined,
			createdAt: undefined,
			updatedAt: undefined
		});
	} else {
		res.json({
			auth: false,
			info: 'token expired'
		});
	}
});



router.post('/confirm_email', (req: TypedRequestBody<{token: string}>, res: Response) => {
	const { token }= req.body;
	const info = jwt.decode(token);
	if(isToken(info)){
		//generate token
		const {uid,  Role, email, vk} = info;
		const generated_token = jwt.sign({
			uid,
			activated: true,
			Role: Role+1,
			email,
			vk
		}, config.secret, {
			expiresIn: '1h'
		});
		//send message
		mailer(`Click this link to confirm your account: http://${config.host}/auth/confirm_email?token=${generated_token}`, email);
	}
	res.json('Account activated!');
});

router.get('/videos', async (req: TypedRequestQuery<{page: string}>, res: Response) => {
	const {page} = req.query;
	const result = await getVideos(+page);
	res.send('All videos! get!');
});

router.get('/user_videos', (req: TypedRequestQuery<{page: string}>, res: Response) => {
	res.send('User videos!');
});


export default router;