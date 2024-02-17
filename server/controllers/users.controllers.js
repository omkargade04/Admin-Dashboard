require("dotenv").config();
const bcrypt = require("bcrypt");
const pool = require("../config/db.js");
const generateUserToken = require("../utils/generateUserToken.js");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  if (!email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: false, content: { message: "Invalid email" } });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: false, content: { message: "Password is required" } });
  }

  try {
    const userQuery = `SELECT * FROM users WHERE email = ?`;
    const userQueryParams = [email];
    console.log(email);
    console.log(password);
    pool.query(userQuery, userQueryParams, (err, result) => {
      if (err) return res.json({ status: false, message: "Query Error" });
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err)
            return res.json({ status: false, message: "Wrong Password" });
          if (response) {
            const email = result[0].email;
            const token = jwt.sign(
              {
                role: "user",
                email: email,
              },
              `${process.env.TOKEN_SECRET}`,
              { expiresIn: "1d" }
            );
            console.log(token)
            res.cookie('token', token)
            return res.json({status: true, message: "Login Successful", data: result, id: result[0].id});
          }
        });
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
};

const displayUser = async (req, res) => {
  try {
    res.status(200).send({ success: true, message: "User displayed" });
  } catch (err) {
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ error: false, message: "Logout Successfull." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal server error!" });
  }
};

module.exports = { login, displayUser, logout };
