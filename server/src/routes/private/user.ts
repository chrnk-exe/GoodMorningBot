import express, {Response, Router} from 'express';
import {TypedRequestBody, TypedRequestQuery} from '../../expressTypes';

const router: Router = express.Router();

router.get('/user', (req: TypedRequestQuery<{id: string}>, res: Response) => {
	const {id} = req.query;
	res.json(id);
});

router.post('/user', (req: TypedRequestBody<NewUser>, res: Response) => {
	const {name} = req.body;
	res.json(name);
});

router.put('/user', (req: TypedRequestBody<{id: string} >, res: Response) => {
	const {id} = req.body;
	res.json(id);
});

router.delete('/user', (req: TypedRequestBody<{id: string}>, res: Response) => {
	const {id} = req.body;
	res.json(id);
});
export default router;