require("dotenv").config();

const {
  JWT_SECRET_KEY,
  JWT_EXPIRATION,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRATION,
  NODEMAILER_EMAIL,
  NODEMAILER_PASS,
} = process.env;

module.exports = {
  JWT_SECRET_KEY,
  JWT_EXPIRATION,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRATION,
  NODEMAILER_EMAIL,
  NODEMAILER_PASS,
};
