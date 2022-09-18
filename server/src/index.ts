import express, { Express, NextFunction, Request, Response } from 'express';
import {default as privateRoutes} from './routes/api';
import {default as publicRoutes} from './routes/public'
import cors from 'cors'
import path from 'path';

const app: Express = express();
const port = 5000;

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[server]: ${req.url}`)
  next()
})

app.use('/api', privateRoutes)
app.use(publicRoutes)

// static ver.
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
// })

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});