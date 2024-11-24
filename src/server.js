import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import 'dotenv/config';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, 
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

const app = express();

app.use(cors());
    
app.use(express.json());

app.use(logger);

app.use(errorHandler);
app.get('/', notFoundHandler);

export function setupServer() {
        try {
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

