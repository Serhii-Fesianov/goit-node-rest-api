import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userSignUpSchema } from "../schemas/usersSchemas.js";
import { signup } from "../controllers/authControlers.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSignUpSchema), signup);

export default authRouter;
