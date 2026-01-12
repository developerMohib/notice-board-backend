import express, { Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './utils/global.err.handler';
import { router } from './routes/routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', router);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello This is Notice Board Backend 🚀');
});

// Handle requests to undefined routes
app.use((req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found 🤦',
  });
});
app.use(globalErrorHandler);
export default app;
