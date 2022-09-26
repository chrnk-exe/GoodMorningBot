import express, { Request, Response, Router } from 'express';
import LoginUser from '../services/LoginUser';
import {TypedRequestBody} from '../expressTypes';

const router: Router = express.Router();

router.post('/login', async (req: TypedRequestBody<LoginRequest>, res: Response) => {
	const { login, password } = req.body.data;
	const user = await LoginUser(login, password);
	if(user){
		res.json({
			auth: true,
			info: 'Success!',
			...user,
			createdAt: undefined,
			updatedAt: undefined
		});
	} else {
		res.json({
			auth: false,
			info: 'Incorrect login/password'
		});
	}
});

router.post('/register', (req: Request, res: Response) => {
	res.json({'register': 'world!'});
});

// router.get('/user', async (req : TypedRequestQuery<{id: string}>, res: Response) => {
//     const { id } = req.query
// })



export default router;