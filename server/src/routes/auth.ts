import express, { Response, Router } from 'express';
import LoginUser from '../services/LoginUser';
import createUser from '../services/createUser';
import {TypedRequestBody, TypedRequestQuery} from '../expressTypes';
import jwt from 'jsonwebtoken';
import config from '../config';
import activateUser from '../services/activateUser';
import isToken from '../typeguards/isToken';

const router: Router = express.Router();

router.post('/login', async (req: TypedRequestBody<ILoginRequest>, res: Response) => {
	const { login, password } = req.body;
	const user = await LoginUser(login, password);
	const token = jwt.sign({
		Role: user?.isAdmin ? 2 : user?.activated ? 1 : 0,
		email: user?.email,
		vk: user?.vklink ? true : false,
		uid: user?.id,
		activated: user?.activated
	}, 
	config.secret, {
		expiresIn: '1d',
	});
	if(user){
		res.json({
			auth: true,
			info: 'Success!',
			...user,
			createdAt: undefined,
			updatedAt: undefined,
			token
		});
	} else {
		res.json({
			auth: false,
			info: 'Incorrect login/password'
		});
	}
});

router.get('/confirm_email', async (req: TypedRequestQuery<{token: string}>, res: Response) => {
	const {token} = req.query;
	const info = jwt.decode(token);
	if(isToken(info)){
		await activateUser(info.uid);
		if(process.env.NODE_ENV === 'production'){
			res.redirect(`http://${config.host}`);
		} else {
			res.redirect('http://localhost:3000');
		}
	} else {
		res.end();
	}
});

router.post('/register', async (req: TypedRequestBody<ILoginRequest>, res: Response) => {
	const {login, password} = req.body;
	const user = await createUser(login, password);
	const token = jwt.sign({
		Role: user?.isAdmin ? 2 : user?.activated ? 1 : 0,
		email: user?.email,
		vk: user?.vklink ? true : false,
		uid: user?.id,
		activated: user?.activated
	}, 
	config.secret, {
		expiresIn: '1d',
	});
	res.json({
		auth: false,
		info: 'New user!',
		...user,
		createdAt: undefined,
		updatedAt: undefined,
		token
	});
});

export default router;