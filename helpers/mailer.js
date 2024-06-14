import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { EMAIL_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
  // service: "meta"?,
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "fesianov_serhii@meta.ua",
    pass: EMAIL_PASSWORD,
  },
});
