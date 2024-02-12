const express = require("express");
const {
  createAdmin,
  login,
  getAllUsers,
  logout,
  createUser,
} = require("../controllers/admin.controllers");
const router = express.Router();
const {
  authMiddleware,
  validateUserData,
} = require("../middlewares/authMiddleware");

router.post("/signup", createAdmin);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getAUser/:id");
router.put("/editUsers/:id");
router.delete("/deleteUser/:id");
router.post("/createUser", validateUserData, createUser);
router.get("/logout", logout);

module.exports = router;
