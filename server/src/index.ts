import express, { Express, Request, Response } from 'express';
import router from './api';
import cors from 'cors'

const app: Express = express();
const port = 5000;

app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/save_video', (req: Request, res: Response) => {
  console.log('save video')
  res.json({'video': 'saved'});
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});