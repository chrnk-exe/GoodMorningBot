import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/save_video', (req: Request, res: Response) => {
  console.log('save video')
  res.json({'video': 'saved'});
})

app.get('/save_video', (req: Request, res: Response) => {
  console.log('save video')
  res.json({'video': 'saved'});
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});