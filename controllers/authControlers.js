import HttpError from "../helpers/HttpError.js";
import { User } from "../models/User.js";

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      throw HttpError(409);
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};
