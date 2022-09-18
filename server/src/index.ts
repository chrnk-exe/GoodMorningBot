import express, { Express, Request, Response } from 'express';
import {default as privateRoutes} from './api';
import cors from 'cors'
import path from 'path';

const app: Express = express();
const port = 5000;

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/save_video', (req: Request, res: Response) => {
  console.log('save video')
  res.json({'video': 'saved'});
})

app.use('/api', privateRoutes)

// static ver.
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
// })

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});