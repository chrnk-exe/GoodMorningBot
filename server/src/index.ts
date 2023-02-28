import express, { Express, NextFunction, Response } from 'express';
import apiRoutes from './routes/api';
import authRoutes from './routes/auth';
import cors from 'cors';
import { expressjwt, Request as JWTRequest } from 'express-jwt';
import config from './config';

const app: Express = express();
const port = 5000;


app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use((req: JWTRequest, res: Response, next: NextFunction) => {
	console.log(`[server]: ${req.url}`);
	next();
});


app.use('/auth', authRoutes);

app.use(expressjwt({ 
	secret: config.secret, 
	algorithms: ['HS256'],
	getToken: (req: JWTRequest) => {
		if (
			req.headers.authorization &&
			req.headers.authorization.split(' ')[0] === 'Bearer'
		) {
			return req.headers.authorization.split(' ')[1];
		} else if (req.query.token) {
			return req.query.token as string;
		}
		return undefined;
	}
}));

app.use('/api', apiRoutes);

// static ver.
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// })

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});