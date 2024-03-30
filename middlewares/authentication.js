import { findUser } from "../auth-services/auth-services.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";

export const authentication = async (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUser({ _id: id });

    if (!user) {
      return next(HttpError(401, "User not found"));
    }

    if (!user.token) {
      return next(HttpError(401, "User already signout"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
