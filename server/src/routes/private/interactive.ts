import express, {Request, Response, Router} from 'express';
import axios from 'axios';
import {TypedRequestBody, TypedRequestQuery} from '../../expressTypes';
import config from '../../config';

const {vkGroupToken} = config;

const router: Router = express.Router();

router.get('/send_video', async (req: TypedRequestQuery<{id: string}>, res: Response) => {
	const {id} = req.query;
	await axios(`https://api.vk.com/method/messages.send?message=hellofromjs&user_id=${id}&random_id=3213412354&v=5.131`, {
		headers: {
			'Authorization': `Bearer ${vkGroupToken}`
		}
	});
	res.json({'aaa': 'aaa'});
});

export default router;