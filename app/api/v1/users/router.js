const express = require("express");
const router = express.Router();

const {
  authenticationUser,
  authorizeRoles,
} = require("../../../middlewares/authentication");
const {
  createCMSOrganizer,
  createCMSAdmin,
  createOwner,
  getCMSUsers,
} = require("./controller");

router.post("/create-owner", createOwner);
router.post(
  "/create-organizer",
  authenticationUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);
router.get(
  "/get-users",
  authenticationUser,
  authorizeRoles("owner"),
  getCMSUsers
);
router.post(
  "/create-admin",
  authenticationUser,
  authorizeRoles("organizer"),
  createCMSAdmin
);

module.exports = router;
