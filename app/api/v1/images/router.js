const express = require("express");
const router = express.Router();

const { create, get, detail, destroy } = require("./controller");

const {
  authenticationUser,
  authorizeRoles,
} = require("../../../middlewares/authentication");
const uploadMiddleware = require("../../../middlewares/multer");

router.use(authenticationUser);
router.use(authorizeRoles("owner", "organizer", "admin"));

router.post("/upload", uploadMiddleware.single("image"), create);
router.get("/get", get);
router.get("/detail/:id", detail);
router.delete("/destroy/:id", destroy);

module.exports = router;
