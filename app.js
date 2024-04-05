import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import avatarRoter from "./routes/avatarRoutes.js";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

dotenv.config();

const { DB_HOST, PORT } = process.env;

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
// app.use("/avatars", express.static(join(__dirname, "public/avatars")));
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/avatars", avatarRoter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
