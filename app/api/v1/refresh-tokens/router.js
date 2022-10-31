const express = require("express");
const router = express.Router();

const { getRefreshToken } = require("./controller");

router.get("/get/:refreshToken", getRefreshToken);

module.exports = router;
