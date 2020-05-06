import express, { Request, Response } from 'express';
const app = express();
import setRoutes from '../routes/index';

const PORT = 3000;

app.get('/', (req: Request, res: Response) => res.send('Starting Classi'));

setRoutes(app);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));