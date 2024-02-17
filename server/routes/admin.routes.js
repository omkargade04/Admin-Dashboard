const express = require("express");
const {
  createAdmin,
  login,
  getAllUsers,
  logout,
  createUser,
  getAUser,
  editUsers,
  deleteUser,
  getAdmin,
} = require("../controllers/admin.controllers");
const router = express.Router();
const {
  authMiddleware,
  validateUserData,
} = require("../middlewares/authMiddleware");

router.post("/signup", createAdmin);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getAUser/:id", getAUser);
router.put("/editUsers/:id", editUsers);
router.delete("/deleteUser/:id", deleteUser);
router.post("/createUser", validateUserData, createUser);
router.get("/logout", logout);
router.get("/getAdmin", getAdmin);

module.exports = router;
