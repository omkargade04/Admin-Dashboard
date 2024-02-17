require("dotenv").config();
const pool = require("../config/db.js");
const generateAdminToken = require("../utils/generateAdminToken.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    const adminQuery = `INSERT INTO admin (username, password) VALUES (?, ?)`;
    const adminQueryParams = [username, hashedPassword];
    const adminQueryData = pool.query(adminQuery, adminQueryParams);

    console.log(adminQueryData);
    res.status(201).json({
      success: true,
      message: "Admin Created Successfully.",
    });
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json({
        error: true,
        message: "Admin with these details already exists",
      });
    } else {
      console.log(error);
      res.status(500).json({ error: true, message: "Internal Server Error!" });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  try {
    const adminQuery = `SELECT * FROM admin WHERE username = ?`;
    const adminQueryParams = [username];
    pool.query(adminQuery, adminQueryParams, (err, result) => {
      if (err) return res.json({ status: false, message: "Query Error" });
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (err)
            return res.json({ status: false, message: "Wrong Password" });
          if (response) {
            const username = result[0].username;
            const token = jwt.sign(
              { role: "admin", username: username },
              `${process.env.TOKEN_SECRET}`,
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            return res.json({
              status: true,
              message: "Login Successful",
              id: result[0].id,
            });
          }
          if (!response) {
            console.log("No response");
          }
        });
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );

    const userQuery = `INSERT INTO users(name, username, email, password) VALUES (?, ?, ?, ?)`;
    const userParams = [name, username, email, hashedPassword];
    const userData = pool.query(userQuery, userParams);
    delete userData.password;

    res.status(200).send({
      status: true,
      message: "New User Created",
      data: userData.values,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).send({
          status: true,
          message: "Retrieved all Data",
          data: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const getAUser = async (req, res) => {
  const id = req.params.id;
  try {
    pool.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).send({
          status: true,
          message: "Retrieved a user Data",
          data: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const editUsers = async (req, res) => {
  const id = req.params.id;
  const { name, username, email } = req.body;
  try {
    pool.query(
      "UPDATE users set name=?, username=?, email=? WHERE id=?",
      [name, username, email, id],
      (err, result) => {
        if (err)
          return res.json({ status: false, message: "Query Error" + err });
        else
          res
            .status(200)
            .send({
              status: true,
              message: "User updated successfully",
              data: result,
            });
      }
    );
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    pool.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
      if (err) return res.json({ status: false, message: "Query Error" + err });
      else
        res
          .status(200)
          .send({ status: true, message: "User deleted", data: result });
    });
  } catch (err) {
    throw err;
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: true, message: "Logout Successfull." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal server error!" });
  }
};

const getAdmin = async (req, res) => {
  try {
    pool.query("SELECT * FROM admin", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        res.status(200).send({
          status: true,
          message: "Retrieved all Data",
          data: results,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createAdmin,
  login,
  getAllUsers,
  getAUser,
  editUsers,
  deleteUser,
  createUser,
  logout,
  getAdmin,
};
