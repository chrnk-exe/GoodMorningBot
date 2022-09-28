import express, { Response, Router } from 'express';
import LoginUser from '../services/LoginUser';
import createUser from '../services/createUser';
import {TypedRequestBody} from '../expressTypes';
import jwt from 'jsonwebtoken';
import config from '../config';

const router: Router = express.Router();

router.post('/login', async (req: TypedRequestBody<ILoginRequest>, res: Response) => {
	const { login, password } = req.body;
	const user = await LoginUser(login, password);
	const token = jwt.sign({
		Role: user?.isAdmin ? 2 : user?.activated ? 1 : 0,
		email: user?.email,
		vk: user?.vklink ? true : false
	}, 
	config.secret, {
		expiresIn: '1d',
	});
	// res.setHeader('Authorization', 'Bearer ' + token);
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

router.post('/register', async (req: TypedRequestBody<IRegisterRequest>, res: Response) => {
	const {email, password} = req.body;
	const user = await createUser(email, password);
	res.json({
		auth: false,
		info: 'New user!',
		...user,
		createdAt: undefined,
		updatedAt: undefined
	});
});

// router.get('/user', async (req : TypedRequestQuery<{id: string}>, res: Response) => {
//     const { id } = req.query
// })



export default router;