import express from 'express';
import { getContactsControllers, getContactsIdControllers } from '../controllers/contacts.js';

const router = express.Router();

router.get('/contacts', getContactsControllers);

router.get('/contacts/:contactId', getContactsIdControllers);

export default router