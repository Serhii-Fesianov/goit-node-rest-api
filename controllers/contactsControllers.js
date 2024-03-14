import validateBody from "../helpers/validateBody.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getByIdContact(id);
  if (!result) {
    throw new Error(404);
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  // const { id } = req.params;
  // const result = await contactsService.
};

export const deleteContact = (req, res) => {};

export default {
  getAllContacts: validateBody(getAllContacts),
  getOneContact: validateBody(getOneContact),
  createContact: validateBody(createContact),
  updateContact,
  deleteContact,
};
