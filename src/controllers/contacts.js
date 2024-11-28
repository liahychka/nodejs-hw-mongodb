import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from "../services/contacts.js";
import express from 'express';
import createHttpError from 'http-errors';

const router = express.Router();

router.use(express.json());

export async function getContactsControllers (req, res) {
  const contacts = await getAllContacts();

      if (contacts === null) {
    throw new createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export async function getContactsIdControllers (req, res) {
  const contact = await getContactById(req.params.contactId);
  
    if (contact === null) {
    throw new createHttpError(404, 'Contact not found');
  }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact,
    });
};

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: "Successfully created a contact!",
    data: result
  });

}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  
  const result = await deleteContact(contactId);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }
  
  res.status(204).send({
  status: 204,
  message: "Contact deleted successfully!",
});
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await updateContact(contactId, contact);

  if (result === null) {
    throw new createHttpError(404, 'Contact not found');
  }

    res.status(200).send({
    status: 200,
    message: "Successfully patched a contact!",
    data: result
  });
  
}