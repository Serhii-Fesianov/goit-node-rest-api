import express from "express";
import validateBody from "../helpers/validateBody.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/usersSchemas.js";
import { signin, signup } from "../controllers/authControlers.js";

const authRouter = express.Router();

authRouter.post("/signin", validateBody(userSignInSchema), signin);

authRouter.post("/signup", validateBody(userSignUpSchema), signup);

export default authRouter;
