import express from 'express';
import { getContactsControllers, getContactsIdControllers, createContactController, deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsControllers));

router.get('/contacts/:contactId', ctrlWrapper(getContactsIdControllers));

router.post('/contacts', jsonParser, ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;