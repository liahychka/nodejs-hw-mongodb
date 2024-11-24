import { getAllContacts, getContactById } from "../services/contacts.js";
import express from 'express';
import pino from 'pino-http';

const router = express.Router();

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

router.use(express.json());
router.use(logger);

export async function getContactsControllers (req, res) {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
        logger.error(error);
  }
}

export async function getContactsIdControllers (req, res) {
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
    logger.error(error);
  }
}