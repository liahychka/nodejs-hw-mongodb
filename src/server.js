import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import 'dotenv/config';
import { initMongoConnection } from './db/js';
import { Contact } from '../models/contact.js';

    const app = express();

    const PORT = process.env.PORT || 3000;

    app.use(cors());

export const setupServer = async () => {

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();

  res.send({ status: 200, message: "Successfully found contacts!", data: contacts });
});

app.get('/students/:contactId', async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (contact === null) {
    return res.status(404).send({ status: 404, message: 'Contact not found' });
  }

  res.send({ status: 200, message: "Successfully found contact with id {contactId}!", data: contact });
});


    app.use(pino((req, res, next) => {
        res.status(404).send({ status: 404, message: "Not found" });
    }));

    app.use(pino((error, req, res, next) => {
        console.error(error);
        res.status(500).send({ status: 500, message: "Internal server error " });
    }));

};

async function bootstrap() {
        try {
        await initMongoConnection();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

bootstrap();