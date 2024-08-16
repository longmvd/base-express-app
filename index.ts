import express, { Express, Request, Response } from 'express';

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Nhiệt liệt chào mừng quý vị đại coder!</h1>');
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
