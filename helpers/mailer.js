import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 2525,
  secure: true,
  auth: {
    user: "littlefox06042000@gmail.com",
    pass: "caxm ykgj mhzi xuyg",
  },
});
