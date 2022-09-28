import express, { Response, Router } from 'express';
import { Request as JWTRequest } from 'express-jwt';

const router: Router = express.Router();

router.get('/videos', (req: JWTRequest, res: Response) => {
	res.send('Hello bro!');
});

router.post('/videos', (req: JWTRequest, res: Response) => {
	res.send('videos post!');
});


export default router;