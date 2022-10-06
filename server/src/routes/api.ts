import express, { Response, Router } from 'express';
// import { Request as JWTRequest } from 'express-jwt';
import { TypedRequestQuery } from '../expressTypes';
import getUser from '../services/getUser';
import jwt from 'jsonwebtoken';
import isToken from '../typeguards/isToken';

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

router.get('/confirm_email', (req: TypedRequestQuery<{token: string}>, res: Response) => {
	
	res.send('Account activated!');
});

router.get('/videos', (req: TypedRequestQuery<{page: string}>, res: Response) => {
	console.log(req.query.page);
	res.send('All videos! get!');
});

router.get('/user_videos', (req: TypedRequestQuery<{page: string}>, res: Response) => {
	console.log(req.query.page);
	res.send('User videos!');
});


export default router;