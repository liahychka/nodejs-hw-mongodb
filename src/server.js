import * as fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';
import path from "node:path";
import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import pino from 'pino-http';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import routes from './routers/contacts.js';
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.js";
// import { authenticate } from "./middlewares/authenticate.js";

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json'), 'utf-8'),
);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use("/photo", express.static(path.resolve("src/public/photo")));

app.use(cors());

app.use(cookieParser());

app.use('/auth', authRouter);

// app.use(authenticate, routes);

app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

app.use('*', notFoundHandler);

app.use(errorHandler);

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

