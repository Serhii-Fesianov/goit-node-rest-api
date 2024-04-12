import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  emailSchema,
  userSignInSchema,
  userSignUpSchema,
} from "../schemas/usersSchemas.js";
import {
  getCurrentUser,
  resendVerifyEmail,
  signin,
  signout,
  signup,
  verifyEmail,
} from "../controllers/authControlers.js";
import { authentication } from "../middlewares/authentication.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignUpSchema), signup);

authRouter.get("/verify/:verificationCode", verifyEmail);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

authRouter.post("/login", validateBody(userSignInSchema), signin);

authRouter.get("/current", authentication, getCurrentUser);

authRouter.post("/logout", authentication, signout);

export default authRouter;
