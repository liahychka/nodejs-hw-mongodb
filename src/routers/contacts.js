import express from 'express';
import { getContactsControllers, getContactsIdControllers, createContactController, deleteContactController, updateContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchemaJoi, replaceContactSchemaJoi } from '../validation/contact.js';
import { loginSchema, registerSchema } from '../validation/auth.js';
import { loginController, registerController } from '../controllers/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsControllers));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactsIdControllers));

router.post('/contacts', jsonParser, validateBody(contactSchemaJoi), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch('/contacts/:contactId', isValidId, jsonParser, validateBody(replaceContactSchemaJoi), ctrlWrapper(updateContactController));

router.post("/auth/register", jsonParser, validateBody(registerSchema), ctrlWrapper(registerController));

router.post("/auth/login", jsonParser, validateBody(loginSchema), ctrlWrapper(loginController));

export default router;