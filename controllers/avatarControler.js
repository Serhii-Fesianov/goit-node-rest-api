import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { nanoid } from "nanoid";
import { User } from "../models/User.js";
import Jimp from "jimp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathToAvatar = path.join(__dirname, "..", "public/avatars");

const contact = [];

export const avatarControler = async (req, res, next) => {
  try {
    const { path: tempupload, originalname } = req.file;
    const resultUpload = path.join(pathToAvatar, originalname);
    const cover = path.join("public", "avatars");
    const newAvatar = {
      id: nanoid(),
      ...req.body,
      cover,
    };
    contact.push(newAvatar);
    await fs.rename(tempupload, resultUpload);
    res.status(201).json(newAvatar);
  } catch (error) {
    next(error);
  }
};

export const getAvatarControler = async (req, res, next) => {
  try {
    const cover = path.join("public", "avatars");
    const newAvatar = {
      id: nanoid(),
      ...req.body,
      cover,
    };
    contact.push(newAvatar);
    res.status(201).json(newAvatar);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempupload, originalname } = req.file;
    const filename = `${_id}${originalname}`;
    const avatarPathMod = `${pathToAvatar}/${filename}`;
    const imgForJimp = await Jimp.read(tempupload);
    await fs.rm(tempupload);
    imgForJimp.resize(250, 250);
    imgForJimp.write(avatarPathMod);
    await User.findByIdAndUpdate(_id, { avatarPathMod });
    res.json({
      avatarPathMod,
    });
  } catch (error) {
    next(error);
  }
};
