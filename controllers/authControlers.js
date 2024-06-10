import {
  createUser,
  findUser,
  updateUser,
  validatePassword,
} from "../auth-services/auth-services.js";
import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { transporter } from "../helpers/mailer.js";
import { nanoid } from "nanoid";
import { User } from "../models/User.js";

const { BASE_URL } = process.env;

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUser({ email: email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const avatarUrl = gravatar.url(email);
    const verificationCode = nanoid();
    const newUser = await createUser({
      ...req.body,
      avatarUrl,
      verificationCode,
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Verify Link</a>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(mailOptions);
    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.params;
    const user = await User.findOne({ verificationCode });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: null,
    });

    res.json({
      message: "Email verify success",
    });
  } catch (error) {
    next(error);
  }
};

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    if (user.verify) {
      throw HttpError(401, "Email already verify");
    }
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify your email",
      html: `<a href=${BASE_URL}/api/users/verify/${user.verificationCode}target="_blank">Verify Link</a>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      message: "Verify email sent success",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser({ email: email });
    if (!user) {
      throw HttpError(401, "Email or password wrong");
    }

    if (!user.verify) {
      throw HttpError(401, "Email not verified");
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
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    res.json({ email });
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
