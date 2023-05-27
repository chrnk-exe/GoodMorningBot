import express, {Response, Router} from 'express';
// import { Request as JWTRequest } from 'express-jwt';
import { TypedRequestBody, TypedRequestQuery } from '../expressTypes';
import getUser from '../services/getUser';
import jwt from 'jsonwebtoken';
import isToken from '../typeguards/isToken';
import getVideos from '../services/getVideos';
import config from '../config';
import userRoutes from './private/user';
import botRoutes from './private/interactive';
import adminController from '../controllers/adminController';

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
			access_token: info.access_token,
			vk_access_token: undefined,
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

router.get('/all_videos', async (req: TypedRequestQuery<{page: string}>, res: Response) => {
	const {page} = req.query;
	const [vkcontentArray, len] = await getVideos(+page);

	res.json({response: vkcontentArray, length: len});
});

router.use('/interactive', botRoutes);

router.use(adminController, userRoutes);

export default router;
