require("dotenv").config();
const pool = require("../config/db.js");
const jwt = require("jsonwebtoken");

const generateUserToken = async (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET);
    const query = `INSERT INTO user_token(token) VALUES (?)`;
    const queryParams = [token];

    await pool.query(query, queryParams);
    console.log(token);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = generateUserToken;
