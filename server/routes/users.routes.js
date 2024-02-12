const express = require("express");
const router = express.Router();
const {
  login,
  displayUser,
  logout,
} = require("../controllers/users.controllers.js");
const {
  validateUserData,
  authMiddleware,
} = require("../middlewares/authMiddleware.js");

router.post("/login", login);
router.get("/displayUser", authMiddleware, displayUser);
router.post("/logout", logout);

module.exports = router;
