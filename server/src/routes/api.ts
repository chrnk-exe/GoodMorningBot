import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/videos', (req: Request, res: Response) => {
	res.send('Hello bro!');
});

router.post('/videos', (req: Request, res: Response) => {
	res.send('videos post!');
});


export default router;