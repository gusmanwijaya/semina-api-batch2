const JWT = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  JWT_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_VERIFY_EXPIRATION,
  JWT_VERIFY_REFRESH_TOKEN_EXPIRATION,
} = require("../configs/config");

module.exports = {
  createJWT: (payload) =>
    JWT.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRATION,
    }),
  createRefreshTokenJWT: (payload) =>
    JWT.sign(payload, JWT_REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION,
    }),
  isJWTValid: (token) =>
    JWT.verify(token, JWT_SECRET_KEY, {
      maxAge: JWT_VERIFY_EXPIRATION,
    }),
  isRefreshTokenJWTValid: (token) =>
    JWT.verify(token, JWT_REFRESH_TOKEN_SECRET_KEY, {
      maxAge: JWT_VERIFY_REFRESH_TOKEN_EXPIRATION,
    }),
};
