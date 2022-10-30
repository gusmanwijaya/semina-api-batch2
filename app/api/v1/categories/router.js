const express = require("express");
const router = express.Router();

const { get, create, detail, update, destroy } = require("./controller");

router.post("/create", create);
router.get("/get", get);
router.get("/detail/:id", detail);
router.patch("/update/:id", update);
router.delete("/destroy/:id", destroy);

module.exports = router;
