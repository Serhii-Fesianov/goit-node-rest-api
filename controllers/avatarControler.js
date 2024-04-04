import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { nanoid } from "nanoid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const avatars = path.join(__dirname, "..", "public/avatars");

const contact = [];

export const avatarControler = async (req, res, next) => {
  try {
    const { path: tempupload, originalname } = req.file;
    const resultUpload = path.join(avatars, originalname);
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
