import { getAllContacts, getContactById, createContact, deleteContact } from "../services/contacts.js";
import express from 'express';
import createHttpError from 'http-errors';

const router = express.Router();

router.use(express.json());

export async function getContactsControllers (req, res) {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
};

export async function getContactsIdControllers (req, res) {
    const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${req.params.contactId}!`,
      data: contact,
    });
  } else {
    throw new createHttpError(404, 'Contact not found');
    }
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
  const { id } = req.params;
  
  const result = await deleteContact(id);

  console.log(result);
  
  res.send("ok");
}


export default router;