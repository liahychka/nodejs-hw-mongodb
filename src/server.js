import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import routes from './routers/contacts.js';

const app = express();

app.use(cors());
app.use(errorHandler);
app.get('/', notFoundHandler);

app.use(routes);

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

