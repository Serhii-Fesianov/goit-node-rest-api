import express from "express";
import {
  avatarControler,
  getAvatarControler,
  updateAvatar,
} from "../controllers/avatarControler.js";
import { authentication } from "../middlewares/authentication.js";
import { upload } from "../middlewares/multerMiddleware.js";

const avatarRouter = express.Router();

// upload.fields([{name: "cover", maxcount: 1}, {name:"subcover", maxcount: 2}])
// upload.array("cover", 8)
avatarRoter.post(
  "/upload",
  authentication,
  upload.single("cover"),
  avatarControler
);

avatarRoter.get("/getavatar", authentication, getAvatarControler);
avatarRoter.patch(
  "/update",
  authentication,
  upload.single("avatar"),
  updateAvatar
);

export default avatarRouter;
