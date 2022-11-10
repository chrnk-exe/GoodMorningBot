import express, { Response, Router } from 'express';
import LoginUser from '../services/LoginUser';
import createUser from '../services/createUser';
import createVkUser from '../services/createVkUser';
import { TypedRequestBody, TypedRequestQuery } from '../expressTypes';
import jwt from 'jsonwebtoken';
import config from '../config';
import activateUser from '../services/activateUser';
import isToken from '../typeguards/isToken';
import axios from 'axios';
import { type AxiosResponse } from 'axios';

const router: Router = express.Router();

router.post(
	'/login',
	async (req: TypedRequestBody<ILoginRequest>, res: Response) => {
		const { login, password } = req.body;
		const user = await LoginUser(login, password);
		const token = jwt.sign(
			{
				Role: user?.isAdmin ? 2 : user?.activated ? 1 : 0,
				email: user?.email,
				vk: user?.vklink ? true : false,
				uid: user?.id,
				activated: user?.activated,
			},
			config.secret,
			{
				expiresIn: '1d',
			}
		);
		console.log(token);
		if (user) {
			res.json({
				auth: true,
				info: 'Success!',
				...user,
				createdAt: undefined,
				updatedAt: undefined,
				token,
				access_token: user.vk_access_token,
				clientKey: config.appID,
			});
		} else {
			res.json({
				auth: false,
				info: 'Incorrect login/password',
			});
		}
	}
);

router.get(
	'/confirm_email',
	async (req: TypedRequestQuery<{ token: string }>, res: Response) => {
		const { token } = req.query;
		const info = jwt.decode(token);
		if (isToken(info)) {
			await activateUser(info.uid);
			if (process.env.NODE_ENV === 'production') {
				res.redirect(`http://${config.host}`);
			} else {
				res.redirect('http://localhost:3000');
			}
		} else {
			res.end();
		}
	}
);

router.post(
	'/register',
	async (req: TypedRequestBody<ILoginRequest>, res: Response) => {
		const { login, password } = req.body;
		const user = await createUser(login, password);
		const token = jwt.sign(
			{
				Role: user?.isAdmin ? 2 : user?.activated ? 1 : 0,
				email: user?.email,
				vk: user?.vklink ? true : false,
				access_token: user.vk_access_token,
				uid: user?.id,
				activated: user?.activated,
			},
			config.secret,
			{
				expiresIn: '1d',
			}
		);
		res.json({
			auth: false,
			info: 'New user!',
			...user,
			createdAt: undefined,
			updatedAt: undefined,
			token,
			access_token: user?.vk_access_token,
		});
	}
);

router.get(
	'/get_client_key',
	(req: TypedRequestQuery<Record<string, never>>, res: Response) => {
		res.json({
			clientKey: config.appID,
		});
	}
);

router.get(
	'/get_access_token',
	async (
		req: TypedRequestQuery<{ code?: string; access_token?: string }>,
		res: Response
	) => {
		const { code } = req.query;
		if (code) {
			let resp: AxiosResponse<AccessTokenResponse> | undefined;
			try {
				resp = await axios.get<AccessTokenResponse>(
					`https://oauth.vk.com/access_token?client_id=${
						config.appID
					}&client_secret=${
						config.secretID
					}&redirect_uri=${'http://localhost:3000'}/login&code=${code}`
				); 
			} catch {
				res.json({
					info: 'Code is invalid or expired'
				});
			}
			
			if(resp){
				const {access_token, user_id, email} = resp.data;

				const user = await createVkUser(access_token, user_id, email);
				
				if(user){
					const token = jwt.sign(
						{
							Role: user?.isAdmin ? 2 : user?.activated ? 1 : 0,
							email: user?.email,
							vk: user?.vklink ? true : false,
							access_token: user?.vk_access_token,
							uid: user?.id,
							activated: user?.activated,
						},
						config.secret,
						{
							expiresIn: '1d',
						}
					);
					res.json({
						auth: true,
						info: 'Success!',
						...user,
						createdAt: undefined,
						updatedAt: undefined,
						token,
						access_token: user.vk_access_token,
						clientKey: config.appID,
					});
				}
			}
		} else {
			res.json({
				auth: false,
				info: 'No code'
			});
		}
	}	
);

router.get('/login_vk', (req: TypedRequestQuery<Record<string, never>>, res: Response) => {
	console.log(req.url);

	res.json({'aaa': 'bbb'});
});

export default router;
