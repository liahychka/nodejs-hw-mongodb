import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import 'dotenv/config';
import { getAllContacts, getContactById } from './services/contacts.js';

const app = express();

app.use(cors());
    
app.use(express.json());

app.use(pino((req, res, next) => {
    res.status(404).send({ status: 404, message: "Not found" });
}));

app.use(pino((error, req, res, next) => {
    console.error(error);
    res.status(500).send({ status: 500, message: "Internal server error " });
}));

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
        console.error(error);
  }
});

app.get('/contacts/:contactId', async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
  }
});

export function setupServer() {
        try {
            const PORT = process.env.PORT || 3001;
            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

