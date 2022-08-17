import express, { Express, Request, Response, Router } from 'express';

const router: Router = express.Router()

router.post('/login', (req: Request, res: Response) => {
    res.json({'heloginllo': 'world!'})
})

router.post('/register', (req: Request, res: Response) => {
    res.json({'register': 'world!'})
})

export default router;