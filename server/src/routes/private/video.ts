import express, {Response, Router} from 'express';
import {TypedRequestBody, TypedRequestQuery} from '../../expressTypes';

const router: Router = express.Router();

router.get('/video', (req: TypedRequestQuery<{id: string}>, res: Response) => {
	const {id} = req.query;
	res.json(id);
});

router.post('/video', (req: TypedRequestBody<NewUser>, res: Response) => {
	const {name} = req.body;
	res.json(name);
});

router.put('/video', (req: TypedRequestBody<{id: string} >, res: Response) => {
	const {id} = req.body;
	res.json(id);
});

router.delete('/video', (req: TypedRequestBody<{id: string}>, res: Response) => {
	const {id} = req.body;
	res.json(id);
});
export default router;