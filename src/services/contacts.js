import { Contact } from "../models/contact.js";

export const getAllContacts = async () => {
  return Contact.find();
};

export const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

export const createContact = async (contact) => {
  return Contact.create(contact);
};

export const deleteContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};