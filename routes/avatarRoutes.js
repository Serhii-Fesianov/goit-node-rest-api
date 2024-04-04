import express from "express";
import {
  avatarControler,
  getAvatarControler,
} from "../controllers/avatarControler.js";
import { authentication } from "../middlewares/authentication.js";
import { upload } from "../middlewares/multerMiddleware.js";

const avatarRoter = express.Router();

// upload.fields([{name: "cover", maxcount: 1}, {name:"subcover", maxcount: 2}])
// upload.array("cover", 8)
avatarRoter.post(
  "/upload",
  authentication,
  upload.single("cover"),
  avatarControler
);

avatarRoter.get("/upload", authentication, getAvatarControler);

export default avatarRoter;
