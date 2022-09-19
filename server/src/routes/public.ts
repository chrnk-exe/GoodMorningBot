import express, { Express, Request, Response, Router } from 'express';
import LoginUser from '../services/LoginUser';
import {TypedRequestBody, TypedRequestQuery} from '../expressTypes'

const router: Router = express.Router()

router.post('/login', async (req: TypedRequestBody<LoginRequest>, res: Response) => {
    console.log(req.query)
    const { login, password } = req.body
    const user = await LoginUser(login, password)
    console.log(user)
    res.json({'aaa': 'aaa'})
})

router.post('/register', (req: Request, res: Response) => {
    res.json({'register': 'world!'})
})

// router.get('/user', async (req : TypedRequestQuery<{id: string}>, res: Response) => {
//     const { id } = req.query
// })



export default router;