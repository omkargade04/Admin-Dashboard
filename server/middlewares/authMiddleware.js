const pool = require("../config/db.js");
const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

const validatePassword = (password) => {
  if (password.length >= 8) {
    return true;
  }
  return false;
};

const validateUserData = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All field are required" });
  }

  if (validateEmail(email) && validatePassword(password)) {
    next();
  } else {
    res.status(400).json({ error: true, message: "Invalid Data" });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ success: false, message: "Auth Failed" });
      } else {
        req.body.userId = decoded.indexOf;
        next();
      }
    });
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: "Auth failed",
    });
  }
};

module.exports = { authMiddleware, validateUserData };
