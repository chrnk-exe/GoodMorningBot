import express, { Express, Request, Response, Router } from 'express';
import seq from './db';
import { MailingUser, User, Videos } from './model';
import { Op } from 'sequelize';

const router: Router = express.Router()

router.post('/login', async (req: Request<never, {}, LoginRequest>, res: Response) => {
    const { data } = req.body
    const { login, password } = data
    const user = await User.findAll({
        where: {
            email: login,
            password: password
        }
    })
    if(user.length === 1){
        const info = user[0]
        res.json({
            auth: true, 
            id: info.getDataValue('id'),
            vklink: info.getDataValue('vklink'),
            last_vizit: info.getDataValue('last_vizit'),
            added_videos: JSON.parse(info.getDataValue('added_videos')),
            isAdmin: info.getDataValue('isAdmin'),
            activated: info.getDataValue('activated')
        })
    } else if(user.length > 1){
        console.warn(`Duplicate user with ${login} email`)
        res.json({auth: false, code: loginErrors.DUPLICATE_USER})
    } else {
        const users = await User.findAll({
            where:{
                email: login
            }
        })
        res.json({auth: false, code: users.length != 0 ? loginErrors.INCORRECT_PASSWORD : loginErrors.USER_DOESNT_EXIST})
    }
})

router.post('/register', (req: Request, res: Response) => {
    res.json({'register': 'world!'})
})

export default router;