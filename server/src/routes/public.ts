import express, { Express, Request, Response, Router } from 'express';
import { Query } from 'express-serve-static-core';
import LoginUser from '../services/LoginUser';

const router: Router = express.Router()

router.post('/login', async (req: TypedRequestBody<LoginRequest>, res: Response) => {
    const { login, password } = req.body
    const user = await LoginUser(login, password)
    console.log(user)
    res.json({'aaa': 'aaa'})
})

router.post('/register', (req: Request, res: Response) => {
    res.json({'register': 'world!'})
})



export default router;