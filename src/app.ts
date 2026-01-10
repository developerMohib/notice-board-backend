import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello This is Notice Board Backend 🚀');
});

// Handle requests to undefined routes
// 404 handler (Express 5 safe)
app.use((req: Request, res: Response) :void => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found 🤦',
  });
});
export default app;
