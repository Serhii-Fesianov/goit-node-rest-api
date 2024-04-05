import {
  createUser,
  findUser,
  updateUser,
  validatePassword,
} from "../auth-services/auth-services.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUser({ email: email });

    if (user) {
      throw HttpError(409, "Email in use");
    }
    const avatarUrl = gravatar.url(email);
    const newUser = await createUser({ ...req.body, avatarUrl });

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await findUser({ email: email });
    if (!user) {
      throw HttpError(401, "Email or password wrong");
    }
    const comparePassword = await validatePassword(password, user.password);

    if (!comparePassword) {
      throw HttpError(401, "Email or password wrong");
    }

    const { _id: id } = user;

    const payload = {
      id: id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await updateUser({ _id: id }, { token });

    res.json({
      token: token,
      user: email,
      subscription: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await updateUser({ _id }, { token: "" });
    res.json({
      message: "Signout success",
    });
  } catch (error) {
    next(error);
  }
};
