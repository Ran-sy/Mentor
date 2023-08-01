const mongoose = require("mongoose");
const validator = require("validator");
const nodemailer = require("nodemailer")
require('dotenv').config()

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) throw new Error("email is invalid");
    },
  },
});

newsletterSchema.methods.transport = function (email, title, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { 
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  let mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: email || "example@gmail.com",
    subject: title || "mentors project",
    html: text || "Hello, from your mentors project",
  };
  transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      throw new Error(err);
    }
    res.send(res)
  });
}

const Newsletter = mongoose.model("Newsletter", newsletterSchema);
module.exports = Newsletter;
