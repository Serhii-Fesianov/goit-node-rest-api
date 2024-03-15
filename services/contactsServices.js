import path from "path";
import { nanoid } from "nanoid";
import fs from "fs/promises";

const contactsPath = path.resolve("db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getByIdContact = async (id) => {
  const contacts = await listContacts();
  const result = await contacts.find((item) => item.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = contacts.find((contact) => contact.id === contactId);
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return removedContact || null;
};

export default {
  contactsPath,
  listContacts,
  getByIdContact,
  addContact,
  updateById,
  removeContact,
};
