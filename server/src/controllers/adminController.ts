import {Request} from 'express-jwt';
import {NextFunction, Response} from 'express';
import isToken from '../typeguards/isToken';

export default (req: Request, res:Response, next: NextFunction) => {
	const token = req.auth;
	if(isToken(token)){
		if(token.Role !== 2)res.status(403);
		else next();
	} else{
		res.status(401);
	}
};