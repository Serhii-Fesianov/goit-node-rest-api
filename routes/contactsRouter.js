import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import { authentication } from "../middlewares/authentication.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authentication, getAllContacts);

contactsRouter.get("/:id", authentication, getOneContact);

contactsRouter.delete("/:id", authentication, deleteContact);

contactsRouter.post(
  "/",
  authentication,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authentication,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authentication,
  validateBody(updateFavoriteSchema),
  updateFavorite
);

export default contactsRouter;
