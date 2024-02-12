require("dotenv").config();
const pool = require("../config/db.js");
const jwt = require("jsonwebtoken");

const generateAdminToken = async (adminId) => {
  try {
    const token = jwt.sign({ id: adminId }, process.env.TOKEN_SECRET);
    const query = `INSERT INTO admin_token(token) VALUES (?)`;
    const queryParams = [token];

    await pool.query(query, queryParams);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = generateAdminToken;
