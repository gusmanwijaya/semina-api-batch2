const express = require("express");
const router = express.Router();

const { signInCMS } = require("./controller");

router.post("/sign-in", signInCMS);

module.exports = router;
